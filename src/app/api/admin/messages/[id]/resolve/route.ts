import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { adminMessages } from '@/db/schema';
import { authenticateAdmin } from '@/lib/auth-utils';
import { eq, sql } from 'drizzle-orm';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await authenticateAdmin(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const { id } = params;
    await db.update(adminMessages)
      .set({
        status: 'resolved',
        resolvedAt: sql`CURRENT_TIMESTAMP`,
        resolvedBy: auth.user.username || auth.user.name,
      })
      .where(eq(adminMessages.id, id));

    return NextResponse.json({ success: true, message: 'Solicitud resuelta' });
  } catch (error) {
    console.error('Error al resolver mensaje:', error);
    return NextResponse.json({ success: false, message: 'Error al resolver mensaje' }, { status: 500 });
  }
}
