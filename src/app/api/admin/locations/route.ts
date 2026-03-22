import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { locations } from '@/db/schema';
import { authenticateAdmin } from '@/lib/auth-utils';

export async function GET(req: NextRequest) {
  const auth = await authenticateAdmin(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const allLocations = await db.query.locations.findMany();
    return NextResponse.json({ success: true, locations: allLocations });
  } catch (error) {
    console.error('Error al obtener ubicaciones:', error);
    return NextResponse.json({ success: false, message: 'Error al obtener ubicaciones' }, { status: 500 });
  }
}
