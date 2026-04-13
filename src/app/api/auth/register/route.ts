import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "@/lib/crypto";
import { generateId, generateSecurePassword } from "@/lib/server-utils";

export async function POST(req: NextRequest) {
  try {
    const { name, rut } = await req.json();

    if (!name || !rut || name.length === 0 || rut.length === 0) {
      return NextResponse.json(
        { success: false, message: "Nombre y RUT son requeridos" },
        { status: 400 },
      );
    }

    // Validar RUT único
    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, rut),
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "El RUT ya está registrado" },
        { status: 409 },
      );
    }

    const password = generateSecurePassword();
    const hashedPassword = await hashPassword(password);
    const userId = generateId();

    await db.insert(users).values({
      id: userId,
      username: rut,
      name,
      password: hashedPassword,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        name,
        rut,
        password,
      },
      message: "Usuario registrado exitosamente",
    });
  } catch (error) {
    console.error("Error en registro:", error);
    return NextResponse.json(
      { success: false, message: "Error en el servidor" },
      { status: 500 },
    );
  }
}
