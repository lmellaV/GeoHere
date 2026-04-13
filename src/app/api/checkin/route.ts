import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { locations, checkins, users, companies } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { calculateDistance, generateId } from "@/lib/server-utils";
import { withObservability } from "@/lib/observability";
import { buildIntegrityProof } from "@/lib/integrity";
import { sendCheckinReceipt } from "@/lib/email";

async function handler(req: NextRequest) {
  try {
    const { userId, locationId, userLatitude, userLongitude, action } =
      await req.json();

    if (
      !userId ||
      !locationId ||
      userLatitude == null ||
      userLongitude == null
    ) {
      return NextResponse.json(
        { success: false, message: "Parámetros incompletos" },
        { status: 400 },
      );
    }

    const location = await db.query.locations.findFirst({
      where: eq(locations.id, locationId),
    });

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!location || !user) {
      return NextResponse.json(
        { success: false, message: "Usuario o ubicación no encontrada" },
        { status: 404 },
      );
    }

    const distance = calculateDistance(
      userLatitude,
      userLongitude,
      location.latitude,
      location.longitude,
    );

    if (distance <= (location.radius || 50)) {
      const checkinId = generateId();
      const now = new Date().toISOString();

      const company = await db.query.companies.findFirst({
        where: eq(companies.id, user.companyId),
      });

      const latestCheckin = await db.query.checkins.findFirst({
        columns: { chainHash: true },
        orderBy: [desc(checkins.createdAt)],
      });

      const integrity = await buildIntegrityProof(
        {
          id: checkinId,
          userId,
          locationId,
          action,
          latitude: userLatitude,
          longitude: userLongitude,
          distance: Number(distance.toFixed(3)),
          actionTime: now,
        },
        latestCheckin?.chainHash || null,
      );

      await db.insert(checkins).values({
        id: checkinId,
        userId,
        locationId,
        action,
        latitude: userLatitude,
        longitude: userLongitude,
        distance,
        signature: integrity.signature,
        payloadHash: integrity.payloadHash,
        prevChainHash: integrity.prevChainHash,
        chainHash: integrity.chainHash,
        receiptStatus: "pending",
        actionTime: now,
      });

      const receipt = await sendCheckinReceipt({
        to: user.email,
        fullName: user.name,
        companyName: company?.name || "Sin empresa",
        action,
        locationName: location.name,
        actionTime: now,
        distance,
        signature: integrity.signature,
        chainHash: integrity.chainHash,
      });

      await db
        .update(checkins)
        .set(
          receipt.ok
            ? { receiptStatus: "sent", receiptSentAt: now, receiptError: null }
            : {
                receiptStatus: "failed",
                receiptError: receipt.error || "Error desconocido",
              },
        )
        .where(eq(checkins.id, checkinId));

      return NextResponse.json({
        success: true,
        message:
          action === "checkin"
            ? "✓ Entrada registrada correctamente"
            : "✓ Salida registrada correctamente",
        distance: Math.round(distance),
        receiptSent: receipt.ok,
        receiptError: receipt.ok ? null : receipt.error,
        signature: integrity.signature,
        chainHash: integrity.chainHash,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: `Fuera de rango (Estás a ${Math.round(distance)}m). Acércate más.`,
          distance: Math.round(distance),
        },
        { status: 403 },
      );
    }
  } catch (error) {
    console.error("Error en check-in:", error);
    return NextResponse.json(
      { success: false, message: "Error en el servidor" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  return withObservability(handler)(req);
}
