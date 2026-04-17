import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { locations } from '@/db/schema';
import { generateId } from '@/lib/server-utils';

export async function GET() {
  try {
    const allLocations = await db.query.locations.findMany({
      columns: {
        id: true,
        name: true,
        latitude: true,
        longitude: true,
        radius: true,
      },
    });
    return NextResponse.json({ success: true, locations: allLocations });
  } catch (error) {
    console.error('Error al obtener ubicaciones:', error);
    return NextResponse.json(
      { success: false, message: 'Error en el servidor' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, latitude, longitude, radius } = await req.json();
    if (!name || latitude == null || longitude == null) {
      return NextResponse.json(
        { success: false, message: 'Faltan datos de ubicación' },
        { status: 400 }
      );
    }

    const defaultRadius = parseInt(
      typeof process !== 'undefined' && process.env?.GEO_RADIUS
        ? process.env.GEO_RADIUS
        : '50',
      10,
    );
    const newId = generateId();

    await db.insert(locations).values({
      id: newId,
      name,
      latitude,
      longitude,
      radius: radius ?? defaultRadius,
    });

    return NextResponse.json({
      success: true,
      location: {
        id: newId,
        name,
        latitude,
        longitude,
        radius: radius ?? defaultRadius,
      },
    });
  } catch (error) {
    console.error('Error al crear ubicación:', error);
    return NextResponse.json(
      { success: false, message: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
