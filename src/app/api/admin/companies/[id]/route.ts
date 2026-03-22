import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { companies } from '@/db/schema';
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
    const { name, password } = await req.json();
    if (!name) return NextResponse.json({ success: false, message: 'Nombre requerido' }, { status: 400 });

    const updateData: any = { name, updatedAt: sql`CURRENT_TIMESTAMP` };
    if (password) {
      updateData.password = await argon2.hash(password);
    }

    await db.update(companies).set(updateData).where(eq(companies.id, id));

    return NextResponse.json({ success: true, message: 'Empresa actualizada' });
  } catch (error) {
    console.error('Error al actualizar empresa:', error);
    return NextResponse.json({ success: false, message: 'Error al actualizar empresa' }, { status: 500 });
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
    await db.delete(companies).where(eq(companies.id, id));
    return NextResponse.json({ success: true, message: 'Empresa eliminada' });
  } catch (error) {
    console.error('Error al eliminar empresa:', error);
    return NextResponse.json({ success: false, message: 'Error al eliminar empresa' }, { status: 500 });
  }
}
