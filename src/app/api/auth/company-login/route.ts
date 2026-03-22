import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { companies } from '@/db/schema';
import { eq } from 'drizzle-orm';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export async function POST(req: NextRequest) {
  try {
    const { name, password } = await req.json();

    if (!name || !password || name.length === 0 || password.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Nombre de empresa y contraseña son requeridos' },
        { status: 400 }
      );
    }

    const company = await db.query.companies.findFirst({
      where: eq(companies.name, name),
    });

    if (!company) {
      return NextResponse.json(
        { success: false, message: 'Empresa no encontrada' },
        { status: 401 }
      );
    }

    const passwordMatch = await argon2.verify(company.password, password);
    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, message: 'Contraseña de empresa incorrecta' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: company.id, name: company.name, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      success: true,
      token,
      company: { id: company.id, name: company.name },
    });
  } catch (error) {
    console.error('Error en login de empresa:', error);
    return NextResponse.json(
      { success: false, message: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
