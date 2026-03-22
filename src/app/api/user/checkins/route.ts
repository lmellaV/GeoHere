import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { checkins } from '@/db/schema';
import { authenticateUser } from '@/lib/auth-utils';
import { eq, desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const auth = await authenticateUser(req);
  if (auth.error) {
    return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  }

  try {
    const userId = auth.user.id;
    const userCheckins = await db.query.checkins.findMany({
      where: eq(checkins.userId, userId),
      orderBy: [desc(checkins.actionTime)],
    });

    return NextResponse.json({ success: true, checkins: userCheckins });
  } catch (error) {
    console.error('Error fetching user checkins:', error);
    return NextResponse.json({ success: false, message: 'Error en el servidor' }, { status: 500 });
  }
}
