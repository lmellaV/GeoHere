import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { companies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword } from "@/lib/crypto";
import { signJwt } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    const { name, password } = await req.json();

    if (!name || !password || name.length === 0 || password.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Nombre de empresa y contraseña son requeridos",
        },
        { status: 400 },
      );
    }

    const company = await db.query.companies.findFirst({
      where: eq(companies.name, name),
    });

    if (!company) {
      return NextResponse.json(
        { success: false, message: "Empresa no encontrada" },
        { status: 401 },
      );
    }

    const passwordMatch = await verifyPassword(company.password, password);
    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, message: "Contraseña de empresa incorrecta" },
        { status: 401 },
      );
    }

    const token = await signJwt({
      id: company.id,
      name: company.name,
      role: "admin",
    });

    return NextResponse.json({
      success: true,
      token,
      company: { id: company.id, name: company.name },
    });
  } catch (error) {
    console.error("Error en login de empresa:", error);
    return NextResponse.json(
      { success: false, message: "Error en el servidor" },
      { status: 500 },
    );
  }
}
