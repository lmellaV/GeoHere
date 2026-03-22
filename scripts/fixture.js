#!/usr/bin/env node
/**
 * GeoHere — Fixture / Reset Script
 * Resets all tables and populates the DB with realistic test data.
 *
 * Usage:
 *   node scripts/fixture.js            → full reset + seed
 *   node scripts/fixture.js --keep-db  → skip drop, only insert missing rows
 */

import Database from 'better-sqlite3';
import bcrypt from 'argon2';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '..', 'app.db');
const db = new Database(dbPath);

// Tiny ARGON2-compatible hash helper
async function hash(pw) {
  return bcrypt.hash(pw);
}

function uid(prefix = '') {
  return `${prefix}${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
}

function ago(minutes) {
  return new Date(Date.now() - minutes * 60_000).toISOString();
}

// ──────────── WIPE ────────────────────────────────────────────
const keepDb = process.argv.includes('--keep-db');
if (!keepDb) {
  console.log('\n🗑  Limpiando tablas...');
  db.exec(`
    DELETE FROM admin_messages;
    DELETE FROM checkins;
    DELETE FROM users;
    DELETE FROM companies;
    DELETE FROM locations;
  `);
  console.log('   ✓ Tablas vaciadas');
}

// ──────────── LOCATIONS ───────────────────────────────────────
console.log('\n📍 Creando ubicaciones...');
const insertLoc = db.prepare(`
  INSERT OR IGNORE INTO locations (id, name, latitude, longitude, radius) VALUES (?, ?, ?, ?, ?)
`);
const locs = [
  { id: 'loc_casona',      name: 'Casona Nueva',         lat: -33.427782, lon: -70.617822, radius: 100  },
  { id: 'loc_providencia', name: 'Sucursal Providencia',  lat: -33.4263,   lon: -70.6152,   radius: 100  },
  { id: 'loc_vitacura',    name: 'Sucursal Vitacura',     lat: -33.3947,   lon: -70.5777,   radius: 100  },
  { id: 'loc_maipu',       name: 'Bodega Maipú',          lat: -33.5117,   lon: -70.761,    radius: 150  },
];
locs.forEach(l => { insertLoc.run(l.id, l.name, l.lat, l.lon, l.radius); console.log(`   ✓ ${l.name}`); });

// ──────────── COMPANIES (admins) ──────────────────────────────
console.log('\n🏢 Creando empresas...');
const insertCompany = db.prepare(`INSERT OR IGNORE INTO companies (id, name, password) VALUES (?, ?, ?)`);
const companyDefs = [
  { id: 'company_casona', name: 'Casona Nueva',  pw: 'admin123' },
  { id: 'company_norte',  name: 'Empresa Norte', pw: 'admin123' },
];
for (const c of companyDefs) {
  const h = await hash(c.pw);
  insertCompany.run(c.id, c.name, h);
  console.log(`   ✓ ${c.name}  (usuario: "${c.name}" / clave: "${c.pw}")`);
}

// ──────────── USERS ───────────────────────────────────────────
console.log('\n👤 Creando usuarios...');
const insertUser = db.prepare(`
  INSERT OR IGNORE INTO users (id, username, name, password, company_id) VALUES (?, ?, ?, ?, ?)
`);
const userDefs = [
  { id: 'user_test_1', username: '12345678-9',  name: 'Usuario Prueba',    pw: 'admin123',  company: 'company_casona' },
  { id: 'user_test_2', username: '98765432-1',  name: 'María Empleado',    pw: 'admin123',  company: 'company_norte'  },
  { id: 'user_test_3', username: '11223344-5',  name: 'Pedro Olvidadizo',  pw: 'admin123',  company: 'company_casona' },
];
for (const u of userDefs) {
  const h = await hash(u.pw);
  insertUser.run(u.id, u.username, u.name, h, u.company);
  console.log(`   ✓ ${u.name}  (RUT: "${u.username}" / clave: "${u.pw}")`);
}

// ──────────── CHECKINS ────────────────────────────────────────
console.log('\n⏱  Creando checkins de prueba...');
const insertCheckin = db.prepare(`
  INSERT OR IGNORE INTO checkins (id, user_id, location_id, action, latitude, longitude, distance, action_time)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);
const checkinData = [
  { uid: 'chk_1', user: 'user_test_1', loc: 'loc_casona',      action: 'checkin',  lat: -33.427782, lon: -70.617822, dist: 0,  min: 480 },
  { uid: 'chk_2', user: 'user_test_1', loc: 'loc_casona',      action: 'checkout', lat: -33.428,    lon: -70.618,    dist: 25, min: 0   },
  { uid: 'chk_3', user: 'user_test_2', loc: 'loc_providencia', action: 'checkin',  lat: -33.4263,   lon: -70.6152,   dist: 0,  min: 600 },
  { uid: 'chk_4', user: 'user_test_2', loc: 'loc_providencia', action: 'checkout', lat: -33.4265,   lon: -70.6154,   dist: 28, min: 120 },
  { uid: 'chk_5', user: 'user_test_3', loc: 'loc_vitacura',    action: 'checkin',  lat: -33.3947,   lon: -70.5777,   dist: 0,  min: 240 },
];
checkinData.forEach(c => {
  insertCheckin.run(c.uid, c.user, c.loc, c.action, c.lat, c.lon, c.dist, ago(c.min));
  console.log(`   ✓ ${c.action} — ${c.user} @ ${c.loc}`);
});

// ──────────── ADMIN MESSAGES ──────────────────────────────────
console.log('\n📨 Creando solicitudes de contraseña...');
const insertMsg = db.prepare(`
  INSERT OR IGNORE INTO admin_messages (id, username, type, status) VALUES (?, ?, ?, ?)
`);
[
  { id: 'msg_1', user: '11223344-5', status: 'pending'  },
  { id: 'msg_2', user: '98765432-1', status: 'pending'  },
  { id: 'msg_3', user: '12345678-9', status: 'resolved' },
].forEach(m => {
  insertMsg.run(m.id, m.user, 'password_reset', m.status);
  console.log(`   ✓ Solicitud ${m.status} — ${m.user}`);
});

// ──────────── SUMMARY ─────────────────────────────────────────
console.log(`
╔══════════════════════════════════════════════════════╗
║            ✅ Fixture aplicado exitosamente           ║
╠══════════════════════════════════════════════════════╣
║  👤 Usuarios de prueba                               ║
║     RUT: 12345678-9  /  clave: admin123              ║
║     RUT: 98765432-1  /  clave: admin123              ║
║     RUT: 11223344-5  /  clave: admin123              ║
║  🏢 Admins (login como empresa)                      ║
║     usuario: "Casona Nueva"   / clave: admin123      ║
║     usuario: "Empresa Norte"  / clave: admin123      ║
║  📍 Ubicaciones: 4                                   ║
║  ⏱  Checkins: 5                                      ║
║  📨 Solicitudes admin: 3 (2 pendientes, 1 resuelta)  ║
╚══════════════════════════════════════════════════════╝
`);
