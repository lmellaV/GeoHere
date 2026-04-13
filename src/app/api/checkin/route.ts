import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { locations, checkins } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { calculateDistance, generateId } from '@/lib/server-utils';
import { withObservability } from '@/lib/observability';

async function handler(req: NextRequest) {
  try {
    const { userId, locationId, userLatitude, userLongitude, action } = await req.json();

    if (
      !userId ||
      !locationId ||
      userLatitude == null ||
      userLongitude == null
    ) {
      return NextResponse.json(
        { success: false, message: 'Parámetros incompletos' },
        { status: 400 }
      );
    }

    const location = await db.query.locations.findFirst({
      where: eq(locations.id, locationId),
    });

    if (!location) {
      return NextResponse.json(
        { success: false, message: 'Ubicación no encontrada' },
        { status: 404 }
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

      await db.insert(checkins).values({
        id: checkinId,
        userId,
        locationId,
        action,
        latitude: userLatitude,
        longitude: userLongitude,
        distance,
        actionTime: now,
      });

      return NextResponse.json({
        success: true,
        message:
          action === 'checkin'
            ? '✓ Entrada registrada correctamente'
            : '✓ Salida registrada correctamente',
        distance: Math.round(distance),
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: `Fuera de rango (Estás a ${Math.round(distance)}m). Acércate más.`,
          distance: Math.round(distance),
        },
        { status: 403 }
      );
    }
  } catch (error) {
    console.error('Error en check-in:', error);
    return NextResponse.json(
      { success: false, message: 'Error en el servidor' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return withObservability(handler)(req);
}
