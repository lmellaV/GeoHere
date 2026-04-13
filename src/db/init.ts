import { db } from "./index";
import { companies, users, locations, adminMessages } from "./schema";
import { hashPassword } from "@/lib/crypto";
import { sql, count } from "drizzle-orm";

// ─── Seed Data ───────────────────────────────────────────────
// These credentials are documented in README.md
const SEED = {
  company: { id: "company_casona", name: "Casona Nueva", password: "admin123" },
  user: {
    id: "user_test_1",
    username: "12345678-9",
    name: "Usuario Prueba",
    password: "admin123",
  },
  locations: [
    {
      id: "loc_casona",
      name: "Casona Nueva",
      latitude: -33.427782,
      longitude: -70.617822,
    },
    {
      id: "loc_providencia",
      name: "Sucursal Providencia",
      latitude: -33.4263,
      longitude: -70.6152,
    },
    {
      id: "loc_vitacura",
      name: "Sucursal Vitacura",
      latitude: -33.3947,
      longitude: -70.5777,
    },
  ],
};

export async function initializeDatabase() {
  try {
    // ─── Create Tables ───────────────────────────────────────
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS companies (
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        name TEXT,
        password TEXT NOT NULL,
        company_id TEXT REFERENCES companies(id),
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS locations (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        radius INTEGER DEFAULT 50,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS checkins (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id),
        location_id TEXT NOT NULL REFERENCES locations(id),
        action TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        distance REAL,
        action_time TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS admin_messages (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        type TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        resolved_at TEXT,
        resolved_by TEXT
      );
    `);

    const radius = parseInt(process.env.GEO_RADIUS || "100", 10);

    // ── Locations ────────────────────────────────────────────
    const locationCount =
      (await db.select({ val: count() }).from(locations))[0]?.val || 0;
    if (locationCount === 0) {
      await db
        .insert(locations)
        .values(SEED.locations.map((l) => ({ ...l, radius })));
      console.log("✓ Ubicaciones seed creadas");
    }

    // ── Company (admin) ──────────────────────────────────────
    const companyCount =
      (await db.select({ val: count() }).from(companies))[0]?.val || 0;
    if (companyCount === 0) {
      const hash = await hashPassword(SEED.company.password);
      await db.insert(companies).values({
        id: SEED.company.id,
        name: SEED.company.name,
        password: hash,
      });
      console.log(
        `✓ Empresa admin creada — usuario: "${SEED.company.name}" / clave: "${SEED.company.password}"`,
      );
    }

    // ── User ─────────────────────────────────────────────────
    const userCount =
      (await db.select({ val: count() }).from(users))[0]?.val || 0;
    if (userCount === 0) {
      const hash = await hashPassword(SEED.user.password);
      await db.insert(users).values({
        id: SEED.user.id,
        username: SEED.user.username,
        name: SEED.user.name,
        password: hash,
        companyId: SEED.company.id,
      });
      console.log(
        `✓ Usuario creado — RUT: "${SEED.user.username}" / clave: "${SEED.user.password}"`,
      );
    }
  } catch (error) {
    console.error("✗ Error en seed de la base de datos:", error);
  }
}
