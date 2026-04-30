import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users, companies, auditTrail } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { authenticateAdmin } from "@/lib/auth-utils";
import { getRequestMetadata } from "@/lib/request-metadata";
import { sha256Hex } from "@/lib/integrity";

export async function GET(req: NextRequest) {
  try {
    await authenticateAdmin(req);

    const pendingUsers = await db.query.users.findMany({
      where: eq(users.status, "pending"),
    });

    return NextResponse.json({
      success: true,
      users: pendingUsers,
    });
  } catch (error) {
    console.error("Error fetching pending users:", error);
    return NextResponse.json(
      { success: false, message: "Error al obtener usuarios pendientes" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await authenticateAdmin(req);

    if ("error" in authResult) {
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: authResult.status },
      );
    }

    const admin = authResult.user;
    const { userId, action } = await req.json();

    if (!userId || !action || !["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { success: false, message: "Parámetros inválidos" },
        { status: 400 },
      );
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    if (user.status !== "pending") {
      return NextResponse.json(
        { success: false, message: "Usuario no está pendiente de aprobación" },
        { status: 400 },
      );
    }

    // Verificar que el admin pertenezca a la misma empresa del usuario
    if (user.companyId !== (admin as any).companyId) {
      return NextResponse.json(
        {
          success: false,
          message: "No tienes permiso para aprobar este usuario",
        },
        { status: 403 },
      );
    }

    const newStatus = action === "approve" ? "approved" : "rejected";

    await db
      .update(users)
      .set({ status: newStatus })
      .where(eq(users.id, userId));

    // Registrar en audit trail
    const requestMeta = getRequestMetadata(req);
    const details = {
      userId,
      previousStatus: user.status,
      newStatus,
      adminId: admin.id,
      adminName: (admin as any).name || (admin as any).username,
    };

    await db.insert(auditTrail).values({
      id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      action: `user.${action}`,
      actorType: "admin",
      actorId: admin.id,
      targetUserId: userId,
      sourceIp: requestMeta.sourceIp,
      userAgent: requestMeta.userAgent,
      detailsJson: JSON.stringify(details),
      detailsHash: await sha256Hex(JSON.stringify(details)),
    });

    return NextResponse.json({
      success: true,
      message:
        action === "approve"
          ? "Usuario aprobado exitosamente"
          : "Usuario rechazado",
    });
  } catch (error) {
    console.error("Error processing user approval:", error);
    return NextResponse.json(
      { success: false, message: "Error al procesar aprobación" },
      { status: 500 },
    );
  }
}
