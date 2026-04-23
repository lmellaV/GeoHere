#!/usr/bin/env node
/**
 * Script de migración para actualizar hashes de Argon2 a PBKDF2 en la base de datos D1.
 * Asume que las contraseñas son las del seed original.
 * Ejecutar después de generar el seed con generate-d1-seed.js
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

const migrations = [
  // Empresas
  { table: "companies", id: "company_casona", password: "Admin123" },
  { table: "companies", id: "company_norte", password: "Admin123" },
  // Usuarios
  { table: "users", id: "user_admin_demo", password: "Admin123#" },
  { table: "users", id: "user_demo_1", password: "User123#" },
  { table: "users", id: "user_test_1", password: "Admin123" },
  { table: "users", id: "user_test_2", password: "Admin123" },
  { table: "users", id: "user_test_3", password: "Admin123" },
];

async function generateMigrationSQL() {
  const stream = createWriteStream("scripts/migrate-hashes.sql");

  stream.write("-- Migración de hashes Argon2 a PBKDF2\n");
  stream.write(
    "-- Ejecutar con: npx wrangler d1 execute getinwork-db --file=scripts/migrate-hashes.sql --remote\n\n",
  );

  for (const item of migrations) {
    const newHash = await hashPassword(item.password);
    stream.write(
      `UPDATE ${item.table} SET password = '${newHash}' WHERE id = '${item.id}';\n`,
    );
  }

  stream.end();
  console.log("Archivo scripts/migrate-hashes.sql generado.");
}

generateMigrationSQL().catch(console.error);
