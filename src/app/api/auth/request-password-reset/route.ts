import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { adminMessages } from '@/db/schema';
import { generateId } from '@/lib/server-utils';

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();
    if (!username) {
      return NextResponse.json(
        { success: false, message: 'Nombre de usuario o RUT requerido' },
        { status: 400 }
      );
    }

    const id = generateId();
    await db.insert(adminMessages).values({
      id,
      username,
      type: 'password_reset',
      status: 'pending',
    });

    return NextResponse.json({
      success: true,
      message: 'Solicitud enviada al administrador exitosamente',
    });
  } catch (error) {
    console.error('Error solicitando cambio de contraseña:', error);
    return NextResponse.json(
      { success: false, message: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
