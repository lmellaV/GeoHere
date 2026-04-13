import Database from "better-sqlite3";
import argon2 from "argon2";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "..", "app.db");
const db = new Database(dbPath);

async function populate() {
  console.log("Limpiando tablas principales...");
  db.exec(`
    DELETE FROM audit_trail;
    DELETE FROM checkins;
    DELETE FROM admin_messages;
    DELETE FROM users;
    DELETE FROM companies;
    DELETE FROM locations;
  `);

  console.log("Poblando ubicaciones...");
  const insertLocation = db.prepare(
    `INSERT INTO locations (id, name, latitude, longitude, radius) VALUES (?, ?, ?, ?, ?)`,
  );
  insertLocation.run("loc_1", "Casa Central", -33.4372, -70.6506, 100);
  insertLocation.run("loc_2", "Sucursal Providencia", -33.4263, -70.6152, 100);

  console.log("Poblando empresas...");
  const hashedAdminPassword = await argon2.hash("Admin123");
  const insertCompany = db.prepare(
    `INSERT INTO companies (id, name, password) VALUES (?, ?, ?)`,
  );
  insertCompany.run("comp_1", "Casona Nueva", hashedAdminPassword);
  insertCompany.run("comp_2", "Empresa Norte", hashedAdminPassword);

  console.log("Poblando usuarios...");
  const insertUser = db.prepare(
    `INSERT INTO users (id, username, name, email, cargo, jornada, password, company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  insertUser.run(
    "usr_1",
    "12345678-9",
    "Juan AdminTest",
    "juan.admintest@getinwork.cl",
    "Operario",
    "Completa",
    hashedAdminPassword,
    "comp_1",
  );
  insertUser.run(
    "usr_2",
    "98765432-1",
    "María Empleado",
    "maria.empleado@getinwork.cl",
    "Supervisora",
    "Turno",
    hashedAdminPassword,
    "comp_2",
  );
  insertUser.run(
    "usr_3",
    "11223344-5",
    "Pedro Olvidadizo",
    "pedro.olvidadizo@getinwork.cl",
    "Técnico",
    "Parcial",
    hashedAdminPassword,
    "comp_1",
  );

  console.log("Poblando checkins...");
  const insertCheckin = db.prepare(
    `INSERT INTO checkins (id, user_id, location_id, action, latitude, longitude, distance, action_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  insertCheckin.run(
    "chk_1",
    "usr_1",
    "loc_1",
    "check_in",
    -33.4372,
    -70.6506,
    0,
    new Date().toISOString(),
  );
  insertCheckin.run(
    "chk_2",
    "usr_2",
    "loc_2",
    "check_out",
    -33.4263,
    -70.6152,
    0,
    new Date(Date.now() - 3600000).toISOString(),
  );

  console.log("Poblando mensajes de admin (solicitudes)...");
  const insertMessage = db.prepare(
    `INSERT INTO admin_messages (id, username, type, status) VALUES (?, ?, ?, ?)`,
  );
  insertMessage.run("msg_1", "11223344-5", "password_reset", "pending");
  insertMessage.run("msg_2", "Desconocido", "password_reset", "pending");
  insertMessage.run("msg_3", "98765432-1", "password_reset", "resolved");

  console.log("Base de datos poblada exitosamente con fixture!");
}

populate().catch(console.error);
