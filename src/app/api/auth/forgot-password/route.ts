import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users, adminMessages } from '@/db/schema';
import { eq, or } from 'drizzle-orm';
import { withObservability } from '@/lib/observability';
import { generateId } from '@/lib/server-utils';

async function handler(req: NextRequest) {
  try {
    const { username } = await req.json();

    if (!username) {
      return NextResponse.json(
        { success: false, message: 'El usuario o RUT es requerido' },
        { status: 400 }
      );
    }

    // Identificar si es RUT para limpiar formato si es necesario
    const isRut = /^\d/.test(username.trim());
    const cleanUsername = isRut ? username.replace(/[^0-9kK]/g, '') : username.trim();
    const cleanUsernameWithDash = isRut ?
      (cleanUsername.slice(0, -1) + '-' + cleanUsername.slice(-1)).toUpperCase() :
      cleanUsername;

    // Verificar si el usuario existe para dar feedback real o genérico por seguridad
    // Aquí daremos feedback real para ayudar al usuario de confianza.
    const user = await db.query.users.findFirst({
      where: or(
        eq(users.username, cleanUsername),
        eq(users.username, cleanUsernameWithDash),
        eq(users.name, cleanUsername) // Opcionalmente buscar por nombre si el login lo permite
      ),
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'No se encontró un usuario con ese identificador.' },
        { status: 404 }
      );
    }

    // Crear la solicitud en admin_messages
    await db.insert(adminMessages).values({
      id: generateId('msg'),
      username: user.username,
      type: 'password_reset',
      status: 'pending',
    });

    return NextResponse.json({
      success: true,
      message: 'Solicitud enviada al administrador. Se te asignará una nueva clave pronto.',
    });
  } catch (error) {
    console.error('Error en forgot-password:', error);
    return NextResponse.json(
      { success: false, message: 'Error en el servidor' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return withObservability(handler)(req);
}
