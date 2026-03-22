import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users, companies } from '@/db/schema';
import { eq, or } from 'drizzle-orm';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { withObservability } from '@/lib/observability';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

async function handler(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Determinar si es un RUT (empieza con números)
    const isRut = /^\d/.test(username.trim());
    const cleanUsername = isRut ? username.replace(/[^0-9kK]/g, '') : username.trim();
    const cleanUsernameWithDash = isRut ?
      (cleanUsername.slice(0, -1) + '-' + cleanUsername.slice(-1)).toUpperCase() :
      cleanUsername;

    console.log('[LOGIN] Searching users for:', cleanUsername);
    // Buscar usuario en la BD
    let authData = await db.query.users.findFirst({
      where: or(
        eq(users.username, cleanUsername),
        eq(users.username, cleanUsernameWithDash),
        eq(users.name, cleanUsername)
      ),
    });

    console.log('[LOGIN] User authData:', authData ? 'Found' : 'Not found');
    let role: 'user' | 'admin' = 'user';

    // Si no es un usuario, buscar en la tabla de empresas
    if (!authData) {
      console.log('[LOGIN] Searching companies for:', cleanUsername);
      const company = await db.query.companies.findFirst({
        where: eq(companies.name, cleanUsername),
      });
      console.log('[LOGIN] Company:', company ? 'Found' : 'Not found');
      if (company) {
        authData = company as any;
        role = 'admin';
      }
    }

    if (!authData) {
      console.log('[LOGIN] Nothing found.');
      return NextResponse.json(
        { success: false, message: 'Usuario o empresa no encontrados. Contacta al administrador.' },
        { status: 401 }
      );
    }

    // Validar contraseña
    console.log('[LOGIN] Verifying password with argon2...');
    const passwordMatch = await argon2.verify(authData.password, password);
    console.log('[LOGIN] Password match:', passwordMatch);
    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, message: 'Contraseña incorrecta' },
        { status: 401 }
      );
    }

    // Generar JWT
    const token = jwt.sign(
      { id: authData.id, username: (authData as any).username || authData.name, role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: authData.id,
        username: (authData as any).username || authData.name,
        name: authData.name || (authData as any).username,
        role,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { success: false, message: 'Error en el servidor' },
      { status: 500 }
    );
  }
}

export const POST = withObservability(handler);
