import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { authenticateAdmin } from "@/lib/auth-utils";
import { eq, sql } from "drizzle-orm";
import { hashPassword } from "@/lib/crypto";
import { isPasswordCompliant } from "@/lib/server-utils";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await authenticateAdmin(req);
  if (auth.error)
    return NextResponse.json(
      { success: false, message: auth.error },
      { status: auth.status },
    );

  try {
    const { id } = await params;
    const { username, name, email, cargo, jornada, password, company_id } =
      await req.json();
    if (!username || !name || !email || !cargo || !jornada || !company_id)
      return NextResponse.json(
        {
          success: false,
          message:
            "Nombre completo, RUT, correo, cargo, jornada y empresa requeridos",
        },
        { status: 400 },
      );

    const updateData: any = {
      username,
      name,
      email,
      cargo,
      jornada,
      companyId: company_id,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    };

    if (password) {
      if (!isPasswordCompliant(password)) {
        return NextResponse.json(
          {
            success: false,
            message:
              "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números",
          },
          { status: 400 },
        );
      }
      updateData.password = await hashPassword(password);
    }

    await db.update(users).set(updateData).where(eq(users.id, id));

    return NextResponse.json({ success: true, message: "Usuario actualizado" });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return NextResponse.json(
      { success: false, message: "Error al actualizar usuario" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await authenticateAdmin(req);
  if (auth.error)
    return NextResponse.json(
      { success: false, message: auth.error },
      { status: auth.status },
    );

  try {
    const { id } = await params;
    await db.delete(users).where(eq(users.id, id));
    return NextResponse.json({ success: true, message: "Usuario eliminado" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return NextResponse.json(
      { success: false, message: "Error al eliminar usuario" },
      { status: 500 },
    );
  }
}
