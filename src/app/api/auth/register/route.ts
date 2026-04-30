import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users, companies, auditTrail } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "@/lib/crypto";
import {
  generateId,
  generateSecurePassword,
  isPasswordCompliant,
} from "@/lib/server-utils";
import { getRequestMetadata } from "@/lib/request-metadata";
import { sha256Hex } from "@/lib/integrity";

export async function POST(req: NextRequest) {
  try {
    const { fullName, name, rut, email, companyId, cargo, jornada, password } =
      await req.json();
    const normalizedName = (fullName || name || "").trim();
    const normalizedRut = (rut || "").trim();
    const normalizedEmail = (email || "").trim().toLowerCase();
    const normalizedCompanyId = (companyId || "").trim();
    const normalizedCargo = (cargo || "").trim();
    const normalizedJornada = (jornada || "").trim();
    const requestedPassword = (password || "").trim();

    if (
      !normalizedName ||
      !normalizedRut ||
      !normalizedEmail ||
      !normalizedCompanyId ||
      !normalizedCargo ||
      !normalizedJornada
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Nombre completo, RUT, correo, empresa, cargo y jornada son requeridos",
        },
        { status: 400 },
      );
    }

    if (requestedPassword && !isPasswordCompliant(requestedPassword)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números",
        },
        { status: 400 },
      );
    }

    // Validar RUT único
    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, normalizedRut),
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "El RUT ya está registrado" },
        { status: 409 },
      );
    }

    // Validar email único
    const existingEmail = await db.query.users.findFirst({
      where: eq(users.email, normalizedEmail),
    });

    if (existingEmail) {
      return NextResponse.json(
        { success: false, message: "El correo ya está registrado" },
        { status: 409 },
      );
    }

    // Validar empresa existente
    const company = await db.query.companies.findFirst({
      where: eq(companies.id, normalizedCompanyId),
    });

    if (!company) {
      return NextResponse.json(
        { success: false, message: "Empresa no válida" },
        { status: 400 },
      );
    }

    const finalPassword = requestedPassword || generateSecurePassword(8);
    const hashedPassword = await hashPassword(finalPassword);
    const userId = generateId();

    await db.insert(users).values({
      id: userId,
      username: normalizedRut,
      name: normalizedName,
      email: normalizedEmail,
      cargo: normalizedCargo,
      jornada: normalizedJornada,
      password: hashedPassword,
      companyId: normalizedCompanyId,
      status: "pending",
    });

    const requestMeta = getRequestMetadata(req);
    const details = {
      fullName: normalizedName,
      rut: normalizedRut,
      email: normalizedEmail,
      companyId: normalizedCompanyId,
      cargo: normalizedCargo,
      jornada: normalizedJornada,
      method: "self_registration",
    };

    await db.insert(auditTrail).values({
      id: generateId("audit"),
      action: "enrollment.created",
      actorType: "self",
      actorId: normalizedRut,
      targetUserId: userId,
      sourceIp: requestMeta.sourceIp,
      userAgent: requestMeta.userAgent,
      detailsJson: JSON.stringify(details),
      detailsHash: await sha256Hex(JSON.stringify(details)),
    });

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        fullName: normalizedName,
        rut: normalizedRut,
        email: normalizedEmail,
        companyId: normalizedCompanyId,
        cargo: normalizedCargo,
        jornada: normalizedJornada,
        password: finalPassword,
        status: "pending",
      },
      message:
        "Usuario registrado exitosamente. Esperando aprobación de la empresa.",
    });
  } catch (error) {
    console.error("Error en registro:", error);
    return NextResponse.json(
      { success: false, message: "Error en el servidor" },
      { status: 500 },
    );
  }
}
