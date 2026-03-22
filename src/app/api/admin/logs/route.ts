import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { checkins, users, locations } from '@/db/schema';
import { authenticateAdmin } from '@/lib/auth-utils';
import { eq, desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const auth = await authenticateAdmin(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const logs = await db.select({
      id: checkins.id,
      user_name: users.name,
      location_name: locations.name,
      action: checkins.action,
      distance: checkins.distance,
      action_time: checkins.actionTime,
    })
    .from(checkins)
    .innerJoin(users, eq(checkins.userId, users.id))
    .innerJoin(locations, eq(checkins.locationId, locations.id))
    .orderBy(desc(checkins.actionTime));

    return NextResponse.json({ success: true, logs });
  } catch (error) {
    console.error('Error al obtener logs:', error);
    return NextResponse.json({ success: false, message: 'Error al obtener logs' }, { status: 500 });
  }
}
