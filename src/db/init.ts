import { db } from './index';
import { companies, users, locations, adminMessages } from './schema';
import argon2 from 'argon2';
import { sql, count } from 'drizzle-orm';

// ─── Seed Data ───────────────────────────────────────────────
// These credentials are documented in README.md
const SEED = {
  company: { id: 'company_casona', name: 'Casona Nueva', password: 'admin123' },
  user:    { id: 'user_test_1',    username: '12345678-9', name: 'Usuario Prueba', password: 'admin123' },
  locations: [
    { id: 'loc_casona',     name: 'Casona Nueva',       latitude: -33.427782, longitude: -70.617822 },
    { id: 'loc_providencia', name: 'Sucursal Providencia', latitude: -33.4263,   longitude: -70.6152   },
    { id: 'loc_vitacura',   name: 'Sucursal Vitacura',  latitude: -33.3947,   longitude: -70.5777   },
  ],
};

export async function initializeDatabase() {
  try {
    const radius = parseInt(process.env.GEO_RADIUS || '100', 10);

    // ── Locations ────────────────────────────────────────────
    const locationCount = (await db.select({ val: count() }).from(locations))[0]?.val || 0;
    if (locationCount === 0) {
      await db.insert(locations).values(
        SEED.locations.map(l => ({ ...l, radius }))
      );
      console.log('✓ Ubicaciones seed creadas');
    }

    // ── Company (admin) ──────────────────────────────────────
    const companyCount = (await db.select({ val: count() }).from(companies))[0]?.val || 0;
    if (companyCount === 0) {
      const hash = await argon2.hash(SEED.company.password);
      await db.insert(companies).values({
        id:       SEED.company.id,
        name:     SEED.company.name,
        password: hash,
      });
      console.log(`✓ Empresa admin creada — usuario: "${SEED.company.name}" / clave: "${SEED.company.password}"`);
    }

    // ── User ─────────────────────────────────────────────────
    const userCount = (await db.select({ val: count() }).from(users))[0]?.val || 0;
    if (userCount === 0) {
      const hash = await argon2.hash(SEED.user.password);
      await db.insert(users).values({
        id:        SEED.user.id,
        username:  SEED.user.username,
        name:      SEED.user.name,
        password:  hash,
        companyId: SEED.company.id,
      });
      console.log(`✓ Usuario creado — RUT: "${SEED.user.username}" / clave: "${SEED.user.password}"`);
    }

  } catch (error) {
    console.error('✗ Error en seed de la base de datos:', error);
  }
}
