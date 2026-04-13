#!/usr/bin/env node
/**
 * Genera el archivo scripts/d1-seed.sql con contraseñas hasheadas usando PBKDF2.
 * Usar ANTES de poblar la base D1 en Cloudflare:
 *
 *   node scripts/generate-d1-seed.js
 *   npx wrangler d1 execute getinwork-db --file=scripts/d1-schema.sql --remote
 *   npx wrangler d1 execute getinwork-db --file=scripts/d1-seed.sql   --remote
 */

import { createWriteStream } from "fs";
import { webcrypto } from "crypto";

const subtle = webcrypto.subtle;

const ALGO = "PBKDF2";
const HASH_FN = "SHA-256";
const ITERATIONS = 250_000;
const KEY_LENGTH = 32;

function uint8ToHex(buf) {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hashPassword(password) {
  const salt = webcrypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    ALGO,
    false,
    ["deriveBits"],
  );
  const derived = await subtle.deriveBits(
    { name: ALGO, salt, iterations: ITERATIONS, hash: HASH_FN },
    keyMaterial,
    KEY_LENGTH * 8,
  );
  return `pbkdf2:${uint8ToHex(salt)}:${uint8ToHex(derived)}`;
}

const seed = {
  companies: [
    { id: "company_casona", name: "Casona Nueva", password: "admin123" },
    { id: "company_norte", name: "Empresa Norte", password: "admin123" },
  ],
  users: [
    {
      id: "user_test_1",
      username: "12345678-9",
      name: "Usuario Prueba",
      password: "admin123",
      company_id: "company_casona",
    },
    {
      id: "user_test_2",
      username: "98765432-1",
      name: "María Empleado",
      password: "admin123",
      company_id: "company_norte",
    },
    {
      id: "user_test_3",
      username: "11223344-5",
      name: "Pedro Olvidadizo",
      password: "admin123",
      company_id: "company_casona",
    },
  ],
  locations: [
    {
      id: "loc_casona",
      name: "Casona Nueva",
      latitude: -33.427782,
      longitude: -70.617822,
      radius: 100,
    },
    {
      id: "loc_providencia",
      name: "Sucursal Providencia",
      latitude: -33.4263,
      longitude: -70.6152,
      radius: 100,
    },
    {
      id: "loc_vitacura",
      name: "Sucursal Vitacura",
      latitude: -33.3947,
      longitude: -70.5777,
      radius: 100,
    },
    {
      id: "loc_maipu",
      name: "Bodega Maipú",
      latitude: -33.5117,
      longitude: -70.761,
      radius: 150,
    },
  ],
};

async function main() {
  const lines = [
    "-- GeoHere D1 Seed — GENERADO AUTOMÁTICAMENTE por scripts/generate-d1-seed.js",
    "-- Contraseñas hasheadas con PBKDF2-SHA256 (compatible con Cloudflare Workers)",
    "",
    "-- Limpieza",
    "DELETE FROM admin_messages;",
    "DELETE FROM checkins;",
    "DELETE FROM users;",
    "DELETE FROM companies;",
    "DELETE FROM locations;",
    "",
    "-- Ubicaciones",
  ];

  for (const loc of seed.locations) {
    lines.push(
      `INSERT INTO locations (id, name, latitude, longitude, radius) VALUES ('${loc.id}', '${loc.name}', ${loc.latitude}, ${loc.longitude}, ${loc.radius});`,
    );
  }

  lines.push("", "-- Empresas (admins)");
  for (const c of seed.companies) {
    const hash = await hashPassword(c.password);
    lines.push(
      `INSERT INTO companies (id, name, password) VALUES ('${c.id}', '${c.name}', '${hash}');`,
    );
    console.log(`✓ Empresa: ${c.name}  →  clave: ${c.password}`);
  }

  lines.push("", "-- Usuarios");
  for (const u of seed.users) {
    const hash = await hashPassword(u.password);
    lines.push(
      `INSERT INTO users (id, username, name, password, company_id) VALUES ('${u.id}', '${u.username}', '${u.name}', '${hash}', '${u.company_id}');`,
    );
    console.log(`✓ Usuario: ${u.username}  →  clave: ${u.password}`);
  }

  lines.push("", "-- Mensajes de prueba");
  lines.push(
    `INSERT INTO admin_messages (id, username, type, status) VALUES ('msg_1', '11223344-5', 'password_reset', 'pending');`,
  );
  lines.push(
    `INSERT INTO admin_messages (id, username, type, status) VALUES ('msg_2', '98765432-1', 'password_reset', 'pending');`,
  );
  lines.push(
    `INSERT INTO admin_messages (id, username, type, status) VALUES ('msg_3', '12345678-9', 'password_reset', 'resolved');`,
  );

  const out = lines.join("\n") + "\n";
  const { writeFileSync } = await import("fs");
  writeFileSync("./scripts/d1-seed.sql", out, "utf8");
  console.log("\n✅ scripts/d1-seed.sql generado correctamente.");
  console.log("   Próximos pasos:");
  console.log(
    "   npx wrangler d1 execute getinwork-db --file=scripts/d1-schema.sql --remote",
  );
  console.log(
    "   npx wrangler d1 execute getinwork-db --file=scripts/d1-seed.sql   --remote",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
