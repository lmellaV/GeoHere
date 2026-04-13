import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { companies } from "@/db/schema";
import { authenticateAdmin } from "@/lib/auth-utils";
import { generateId } from "@/lib/server-utils";
import { hashPassword } from "@/lib/crypto";

export async function GET(req: NextRequest) {
  const auth = await authenticateAdmin(req);
  if (auth.error)
    return NextResponse.json(
      { success: false, message: auth.error },
      { status: auth.status },
    );

  try {
    const allCompanies = await db.query.companies.findMany({
      columns: {
        id: true,
        name: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ success: true, companies: allCompanies });
  } catch (error) {
    console.error("Error al obtener empresas:", error);
    return NextResponse.json(
      { success: false, message: "Error al obtener empresas" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const auth = await authenticateAdmin(req);
  if (auth.error)
    return NextResponse.json(
      { success: false, message: auth.error },
      { status: auth.status },
    );

  try {
    const { name, password } = await req.json();
    if (!name || !password)
      return NextResponse.json(
        { success: false, message: "Nombre y contraseña requeridos" },
        { status: 400 },
      );

    const hashedPassword = await hashPassword(password);
    const id = generateId();
    await db.insert(companies).values({ id, name, password: hashedPassword });

    return NextResponse.json({ success: true, company: { id, name } });
  } catch (error) {
    console.error("Error al crear empresa:", error);
    return NextResponse.json(
      { success: false, message: "Error al crear empresa" },
      { status: 500 },
    );
  }
}
