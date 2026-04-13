import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users, companies, auditTrail } from "@/db/schema";
import { authenticateAdmin } from "@/lib/auth-utils";
import { generateId } from "@/lib/server-utils";
import { isPasswordCompliant } from "@/lib/server-utils";
import { hashPassword } from "@/lib/crypto";
import { eq } from "drizzle-orm";
import { getRequestMetadata } from "@/lib/request-metadata";
import { sha256Hex } from "@/lib/integrity";

export async function GET(req: NextRequest) {
  const auth = await authenticateAdmin(req);
  if (auth.error)
    return NextResponse.json(
      { success: false, message: auth.error },
      { status: auth.status },
    );

  try {
    const allUsers = await db
      .select({
        id: users.id,
        username: users.username,
        name: users.name,
        email: users.email,
        cargo: users.cargo,
        jornada: users.jornada,
        companyId: users.companyId,
        companyName: companies.name,
        createdAt: users.createdAt,
      })
      .from(users)
      .leftJoin(companies, eq(users.companyId, companies.id));

    return NextResponse.json({ success: true, users: allUsers });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return NextResponse.json(
      { success: false, message: "Error al obtener usuarios" },
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
    const { username, name, email, cargo, jornada, password, company_id } =
      await req.json();
    if (
      !username ||
      !name ||
      !email ||
      !cargo ||
      !jornada ||
      !password ||
      !company_id
    )
      return NextResponse.json(
        {
          success: false,
          message:
            "Nombre completo, RUT, correo, cargo, jornada, contraseña y empresa requeridos",
        },
        { status: 400 },
      );

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

    const hashedPassword = await hashPassword(password);
    const id = generateId();
    await db.insert(users).values({
      id,
      username: username.trim(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      cargo: cargo.trim(),
      jornada: jornada.trim(),
      password: hashedPassword,
      companyId: company_id,
    });

    const requestMeta = getRequestMetadata(req);
    const details = {
      fullName: name.trim(),
      rut: username.trim(),
      email: email.trim().toLowerCase(),
      cargo: cargo.trim(),
      jornada: jornada.trim(),
      companyId: company_id,
      method: "admin_enrollment",
    };

    await db.insert(auditTrail).values({
      id: generateId("audit"),
      action: "enrollment.created",
      actorType: "admin",
      actorId: auth.user?.id || auth.user?.username || "admin_unknown",
      targetUserId: id,
      sourceIp: requestMeta.sourceIp,
      userAgent: requestMeta.userAgent,
      detailsJson: JSON.stringify(details),
      detailsHash: await sha256Hex(JSON.stringify(details)),
    });

    return NextResponse.json({
      success: true,
      user: { id, username, name, email, cargo, jornada },
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return NextResponse.json(
      { success: false, message: "Error al crear usuario" },
      { status: 500 },
    );
  }
}
