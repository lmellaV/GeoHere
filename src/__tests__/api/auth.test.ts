import { describe, it, expect, vi } from "vitest";
import { POST as loginPost } from "@/app/api/auth/login/route";
import { POST as registerPost } from "@/app/api/auth/register/route";
import { NextRequest } from "next/server";
import { db } from "@/db";
import { users, companies } from "@/db/schema";
import { eq } from "drizzle-orm";
import argon2 from "argon2";

describe("Auth API Endpoints", () => {
  it("should register a new user", async () => {
    await db
      .insert(companies)
      .values({
        id: "test_company_1",
        name: "Empresa Test Registro",
        password: await argon2.hash("admin123"),
      })
      .onConflictDoNothing();

    const req = new NextRequest("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        fullName: "Test User",
        rut: "11222333-4",
        email: "test.user@getinwork.cl",
        companyId: "test_company_1",
        cargo: "Operario",
        jornada: "Completa",
        password: "Admin123",
      }),
    });

    const res = await registerPost(req);
    const data = await res.json();

    expect(data.success).toBe(true);
    expect(data.user.fullName).toBe("Test User");
    expect(data.user.rut).toBe("11222333-4");
    expect(data.user.email).toBe("test.user@getinwork.cl");
    expect(data.user.cargo).toBe("Operario");
    expect(data.user.jornada).toBe("Completa");
    expect(data.user.password).toBeDefined();

    // Cleanup
    await db.delete(users).where(eq(users.username, "11222333-4"));
  });

  it("should login with valid user credentials", async () => {
    // Ensure test user exists (using the default one created in init or creating a fresh one)
    const password = "Admin123";
    const hashedPassword = await argon2.hash(password);
    const username = "12345678-9";

    // Check if exists, update if needed
    const existing = await db.query.users.findFirst({
      where: eq(users.username, username),
    });
    if (!existing) {
      await db.insert(users).values({
        id: "test_user_1",
        username,
        name: "Usuario Prueba",
        email: "usuario.prueba.test@getinwork.cl",
        cargo: "Operario",
        jornada: "Completa",
        password: hashedPassword,
        companyId: "test_company_1",
      });
    } else {
      await db
        .update(users)
        .set({ password: hashedPassword })
        .where(eq(users.username, username));
    }

    const req = new NextRequest("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    const res = await loginPost(req);
    const data = await res.json();

    expect(data.success).toBe(true);
    expect(data.token).toBeDefined();
    expect(data.user.role).toBe("user");
  });

  it("should fail login with invalid password", async () => {
    const req = new NextRequest("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: "12345678-9",
        password: "wrongpassword",
      }),
    });

    const res = await loginPost(req);
    const data = await res.json();

    expect(data.success).toBe(false);
    expect(data.message).toContain("Contraseña incorrecta");
  });
});
