import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users, companies } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import { verifyPassword } from "@/lib/crypto";
import { signJwt } from "@/lib/jwt";
import { withObservability } from "@/lib/observability";

async function handler(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Usuario y contraseña son requeridos" },
        { status: 400 },
      );
    }

    // Determinar si es un RUT (empieza con números)
    const isRut = /^\d/.test(username.trim());
    const cleanUsername = isRut
      ? username.replace(/[^0-9kK]/g, "")
      : username.trim();
    const cleanUsernameWithDash = isRut
      ? (
          cleanUsername.slice(0, -1) +
          "-" +
          cleanUsername.slice(-1)
        ).toUpperCase()
      : cleanUsername;

    console.log("[LOGIN] Searching users for:", cleanUsername);
    // Buscar usuario en la BD
    let authData = await db.query.users.findFirst({
      where: or(
        eq(users.username, cleanUsername),
        eq(users.username, cleanUsernameWithDash),
        eq(users.name, cleanUsername),
      ),
    });

    console.log("[LOGIN] User authData:", authData ? "Found" : "Not found");
    let role: "user" | "admin" = "user";

    // Asignar rol admin al usuario específico
    if (authData?.username === "20575293-5") {
      role = "admin";
    }

    // Si no es un usuario, buscar en la tabla de empresas
    if (!authData) {
      console.log("[LOGIN] Searching companies for:", cleanUsername);
      const company = await db.query.companies.findFirst({
        where: eq(companies.name, cleanUsername),
      });
      console.log("[LOGIN] Company:", company ? "Found" : "Not found");
      if (company) {
        authData = company as any;
        role = "admin";
      }
    }

    if (!authData) {
      console.log("[LOGIN] Nothing found.");
      return NextResponse.json(
        {
          success: false,
          message:
            "Usuario o empresa no encontrados. Contacta al administrador.",
        },
        { status: 401 },
      );
    }

    // Verificar que el usuario esté aprobado (si es usuario, no empresa)
    if ("status" in authData && authData.status === "pending") {
      return NextResponse.json(
        {
          success: false,
          message: "Tu cuenta está pendiente de aprobación por la empresa.",
        },
        { status: 403 },
      );
    }

    if ("status" in authData && authData.status === "rejected") {
      return NextResponse.json(
        {
          success: false,
          message: "Tu cuenta fue rechazada. Contacta al administrador.",
        },
        { status: 403 },
      );
    }

    // Validar contraseña
    console.log("[LOGIN] Verifying password...");

    try {
      const passwordMatch = await verifyPassword(authData.password, password);
      console.log("[LOGIN] Password match:", passwordMatch);

      if (!passwordMatch) {
        return NextResponse.json(
          { success: false, message: "Contraseña incorrecta" },
          { status: 401 },
        );
      }
    } catch (err) {
      console.error("🔥 PASSWORD ERROR:", err);
      if (
        err instanceof Error &&
        err.message === "argon2_password_hash_not_supported_in_this_runtime"
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Tu contraseña está en un formato antiguo y no puede verificarse en este entorno. Ejecuta la migración de hashes o restablece la contraseña.",
          },
          { status: 409 },
        );
      }
      return NextResponse.json(
        { success: false, message: "Error en verificación de contraseña" },
        { status: 500 },
      );
    }

    // Generar JWT
    const token = await signJwt({
      id: authData.id,
      username: (authData as any).username || authData.name,
      role,
    });

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
    const msg = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    console.error("Error en login:", msg, stack);
    return NextResponse.json(
      { success: false, message: "Error en el servidor", debug: msg },
      { status: 500 },
    );
  }
}

export const POST = withObservability(handler);
