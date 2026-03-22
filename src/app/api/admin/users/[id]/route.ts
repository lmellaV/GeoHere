import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { authenticateAdmin } from '@/lib/auth-utils';
import { eq, sql } from 'drizzle-orm';
import argon2 from 'argon2';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await authenticateAdmin(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const { id } = params;
    const { username, name, password, company_id } = await req.json();
    if (!username || !name) return NextResponse.json({ success: false, message: 'Username y nombre requeridos' }, { status: 400 });

    const updateData: any = {
      username,
      name,
      companyId: company_id,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    };

    if (password) {
      updateData.password = await argon2.hash(password);
    }

    await db.update(users).set(updateData).where(eq(users.id, id));

    return NextResponse.json({ success: true, message: 'Usuario actualizado' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return NextResponse.json({ success: false, message: 'Error al actualizar usuario' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await authenticateAdmin(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const { id } = params;
    await db.delete(users).where(eq(users.id, id));
    return NextResponse.json({ success: true, message: 'Usuario eliminado' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return NextResponse.json({ success: false, message: 'Error al eliminar usuario' }, { status: 500 });
  }
}
