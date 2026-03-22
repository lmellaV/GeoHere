import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { adminMessages, users } from '@/db/schema';
import { authenticateAdmin } from '@/lib/auth-utils';
import { desc, eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const auth = await authenticateAdmin(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const messages = await db.select({
      id: adminMessages.id,
      username: adminMessages.username,
      name: users.name,
      type: adminMessages.type,
      status: adminMessages.status,
      createdAt: adminMessages.createdAt,
      resolvedAt: adminMessages.resolvedAt,
    })
    .from(adminMessages)
    .leftJoin(users, eq(adminMessages.username, users.username))
    .orderBy(desc(adminMessages.createdAt));

    return NextResponse.json({ success: true, messages });
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    return NextResponse.json({ success: false, message: 'Error al obtener mensajes' }, { status: 500 });
  }
}
