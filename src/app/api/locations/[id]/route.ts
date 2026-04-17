import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { locations, checkins } from "@/db/schema";
import { eq, sql, count } from "drizzle-orm";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { name, latitude, longitude, radius } = await req.json();

    if (!name || latitude == null || longitude == null) {
      return NextResponse.json(
        { success: false, message: "Faltan datos de ubicación" },
        { status: 400 },
      );
    }

    const existingLoc = await db.query.locations.findFirst({
      where: eq(locations.id, id),
    });

    if (!existingLoc) {
      return NextResponse.json(
        { success: false, message: "Ubicación no encontrada" },
        { status: 404 },
      );
    }

    const defaultRadius = parseInt(
      typeof process !== "undefined" && process.env?.GEO_RADIUS
        ? process.env.GEO_RADIUS
        : "50",
      10,
    );

    await db
      .update(locations)
      .set({
        name,
        latitude,
        longitude,
        radius: radius ?? defaultRadius,
        updatedAt: sql`CURRENT_TIMESTAMP`,
      })
      .where(eq(locations.id, id));

    return NextResponse.json({
      success: true,
      location: {
        id,
        name,
        latitude,
        longitude,
        radius: radius ?? defaultRadius,
      },
    });
  } catch (error) {
    console.error("Error al editar ubicación:", error);
    return NextResponse.json(
      { success: false, message: "Error en el servidor" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const existingLoc = await db.query.locations.findFirst({
      where: eq(locations.id, id),
    });

    if (!existingLoc) {
      return NextResponse.json(
        { success: false, message: "Ubicación no encontrada" },
        { status: 404 },
      );
    }

    // Verificar que no hay check-ins asociados
    const checkinCountResult = await db
      .select({ count: count() })
      .from(checkins)
      .where(eq(checkins.locationId, id));

    const checkinCount = checkinCountResult[0]?.count || 0;

    if (checkinCount > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No se puede eliminar una ubicación con check-ins asociados",
        },
        { status: 400 },
      );
    }

    await db.delete(locations).where(eq(locations.id, id));

    return NextResponse.json({
      success: true,
      message: "Ubicación eliminada correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar ubicación:", error);
    return NextResponse.json(
      { success: false, message: "Error en el servidor" },
      { status: 500 },
    );
  }
}
