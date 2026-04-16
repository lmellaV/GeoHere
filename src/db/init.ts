import { db } from "./index";
import { companies, users, locations, adminMessages } from "./schema";
import { hashPassword } from "@/lib/crypto";
import { sql, count, eq } from "drizzle-orm";

// ─── Seed Data ───────────────────────────────────────────────
// These credentials are documented in README.md
const SEED = {
  company: { id: "company_casona", name: "Casona Nueva", password: "admin123" },
  users: [
    {
      id: "user_admin_demo",
      username: "11111111-1",
      name: "Administrador Demo",
      email: "admin.demo@getinwork.cl",
      cargo: "Administrador",
      jornada: "Completa",
      password: "Admin123#",
    },
    {
      id: "user_demo_1",
      username: "22222222-2",
      name: "Usuario Demo",
      email: "user.demo@getinwork.cl",
      cargo: "Operario",
      jornada: "Completa",
      password: "User123#",
    },
  ],
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
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        cargo TEXT NOT NULL,
        jornada TEXT NOT NULL,
        password TEXT NOT NULL,
        company_id TEXT NOT NULL REFERENCES companies(id),
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
        signature TEXT,
        payload_hash TEXT,
        prev_chain_hash TEXT,
        chain_hash TEXT,
        receipt_status TEXT DEFAULT 'pending',
        receipt_sent_at TEXT,
        receipt_error TEXT,
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
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS audit_trail (
        id TEXT PRIMARY KEY,
        action TEXT NOT NULL,
        actor_type TEXT NOT NULL,
        actor_id TEXT NOT NULL,
        target_user_id TEXT,
        source_ip TEXT,
        user_agent TEXT,
        details_json TEXT,
        details_hash TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
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

    // ── Usuarios de demostración ───────────────────────────────
    for (const seedUser of SEED.users) {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.username, seedUser.username),
      });
      if (!existingUser) {
        const hash = await hashPassword(seedUser.password);
        await db.insert(users).values({
          id: seedUser.id,
          username: seedUser.username,
          name: seedUser.name,
          email: seedUser.email,
          cargo: seedUser.cargo,
          jornada: seedUser.jornada,
          password: hash,
          companyId: SEED.company.id,
        });
        console.log(
          `✓ Usuario creado — RUT: "${seedUser.username}" / clave: "${seedUser.password}"`,
        );
      }
    }
  } catch (error) {
    console.error("✗ Error en seed de la base de datos:", error);
  }
}
