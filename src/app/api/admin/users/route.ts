import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users, companies } from '@/db/schema';
import { authenticateAdmin } from '@/lib/auth-utils';
import { generateId } from '@/lib/server-utils';
import argon2 from 'argon2';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const auth = await authenticateAdmin(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const allUsers = await db.select({
      id: users.id,
      username: users.username,
      name: users.name,
      companyId: users.companyId,
      companyName: companies.name,
      createdAt: users.createdAt,
    })
    .from(users)
    .leftJoin(companies, eq(users.companyId, companies.id));

    return NextResponse.json({ success: true, users: allUsers });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return NextResponse.json({ success: false, message: 'Error al obtener usuarios' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await authenticateAdmin(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const { username, name, password, company_id } = await req.json();
    if (!username || !password) return NextResponse.json({ success: false, message: 'Username y contraseña requeridos' }, { status: 400 });

    const hashedPassword = await argon2.hash(password);
    const id = generateId();
    await db.insert(users).values({
      id,
      username,
      name,
      password: hashedPassword,
      companyId: company_id,
    });

    return NextResponse.json({ success: true, user: { id, username, name } });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return NextResponse.json({ success: false, message: 'Error al crear usuario' }, { status: 500 });
  }
}
