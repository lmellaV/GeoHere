import express from "express";
import type { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "..", "app.db");

const app: Express = express();
const db = new Database(dbPath);
const PORT = process.env.PORT || 3001;
const GEO_RADIUS = parseInt(process.env.GEO_RADIUS || "50", 10);

app.use(cors());
app.use(express.json());

// Inicializar base de datos
function initializeDatabase() {
  // Crear tabla de empresas
  db.exec(`
    CREATE TABLE IF NOT EXISTS companies (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Crear tabla de usuarios
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      name TEXT,
      password TEXT NOT NULL,
      company_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (company_id) REFERENCES companies(id)
    );
  `);

  // Crear tabla de ubicaciones
  db.exec(`
    CREATE TABLE IF NOT EXISTS locations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      radius INTEGER DEFAULT 50,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Crear tabla de check-ins
  db.exec(`
    CREATE TABLE IF NOT EXISTS checkins (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      location_id TEXT NOT NULL,
      action TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      distance REAL,
      action_time DATETIME NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (location_id) REFERENCES locations(id)
    );
  `);

  // Asegurar columna action_time en checkins (para updates de esquema)
  const checkinInfo = db.prepare("PRAGMA table_info(checkins)").all() as Array<{
    name: string;
  }>;
  if (!checkinInfo.find((col) => col.name === "action_time")) {
    db.exec(
      "ALTER TABLE checkins ADD COLUMN action_time DATETIME DEFAULT CURRENT_TIMESTAMP",
    );
  }

  // Asegurar columna name en users (para updates de esquema)
  const userInfo = db.prepare("PRAGMA table_info(users)").all() as Array<{
    name: string;
  }>;
  if (!userInfo.find((col) => col.name === "name")) {
    db.exec("ALTER TABLE users ADD COLUMN name TEXT");
  }

  // Verificar si existen ubicaciones, si no, crear las predeterminadas
  const locationCount = db
    .prepare("SELECT COUNT(*) as count FROM locations")
    .get() as { count: number };

  if (locationCount.count === 0) {
    const insertLocation = db.prepare(
      `INSERT INTO locations (id, name, latitude, longitude, radius)
       VALUES (?, ?, ?, ?, ?)`,
    );

    insertLocation.run("1", "Oficina Principal", 40.7128, -74.006, GEO_RADIUS);
    insertLocation.run("2", "Sucursal Centro", 40.7484, -73.9857, GEO_RADIUS);
    insertLocation.run("3", "Casona Nueva", -33.427782, -70.617822, GEO_RADIUS);

    console.log("✓ Ubicaciones inicializadas");
  }

  // Verificar si existen empresas, si no, crear la predeterminada
  const companyCount = db
    .prepare("SELECT COUNT(*) as count FROM companies")
    .get() as { count: number };

  if (companyCount.count === 0) {
    const insertCompany = db.prepare(
      `INSERT INTO companies (id, name, password)
       VALUES (?, ?, ?)`,
    );

    insertCompany.run("1", "Casona Nueva", "admin123");

    console.log("✓ Empresa inicializada: Casona Nueva (password: admin123)");
  }
  // Crear usuario de prueba si no existen usuarios
  const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get() as {
    count: number;
  };

  if (userCount.count === 0) {
    const insertTestUser = db.prepare(
      "INSERT INTO users (id, username, name, password) VALUES (?, ?, ?, ?)",
    );

    insertTestUser.run(
      "test_user_1",
      "12345678-9",
      "Usuario Prueba",
      "prueba123",
    );

    console.log("✓ Usuario de prueba creado:");
    console.log("  RUT: 12345678-9");
    console.log("  Nombre: Usuario Prueba");
    console.log("  Contraseña: prueba123");
  }
}

// Función para generar IDs únicos
function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Función para generar contraseña segura de 6 caracteres
function generateSecurePassword(): string {
  const symbols = "!@#$%^&*";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";

  // Asegurar al menos uno de cada tipo
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  const upper = uppercase[Math.floor(Math.random() * uppercase.length)];
  const number = numbers[Math.floor(Math.random() * numbers.length)];

  // Generar 3 letras minúsculas
  let lowers = "";
  for (let i = 0; i < 3; i++) {
    lowers += lowercase[Math.floor(Math.random() * lowercase.length)];
  }

  // Mezclar todos los caracteres
  const allChars = [symbol, upper, number, ...lowers.split("")];
  for (let i = allChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allChars[i], allChars[j]] = [allChars[j], allChars[i]];
  }

  return allChars.join("");
}

// Función para calcular distancia (Haversine formula)
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Registrar nuevo usuario
app.post("/api/auth/register", (req: Request, res: Response) => {
  try {
    const { name, rut } = req.body;

    if (!name || !rut || name.length === 0 || rut.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Nombre y RUT son requeridos" });
    }

    // Validar RUT único
    const findUser = db.prepare("SELECT * FROM users WHERE username = ?");
    const existingUser = findUser.get(rut);

    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "El RUT ya está registrado" });
    }

    const password = generateSecurePassword();
    const userId = generateId();

    const insertUser = db.prepare(
      "INSERT INTO users (id, username, name, password) VALUES (?, ?, ?, ?)",
    );
    insertUser.run(userId, rut, name, password);

    res.json({
      success: true,
      user: {
        id: userId,
        name,
        rut,
        password,
      },
      message: "Usuario registrado exitosamente",
    });
  } catch (error) {
    console.error("Error en registro:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor" });
  }
});

// Validar credenciales (por RUT o nombre)
app.post("/api/auth/login", (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (
      !username ||
      !password ||
      username.length === 0 ||
      password.length === 0
    ) {
      res
        .status(401)
        .json({ success: false, message: "Credenciales inválidas" });
      return;
    }

    // Buscar usuario en la BD por RUT (username) o por nombre
    const findUserByRut = db.prepare("SELECT * FROM users WHERE username = ?");
    const findUserByName = db.prepare("SELECT * FROM users WHERE name = ?");

    let user = findUserByRut.get(username) as {
      id: string;
      username: string;
      name?: string;
      password: string;
    } | null;

    // Si no existe por RUT, buscar por nombre
    if (!user) {
      user = findUserByName.get(username) as {
        id: string;
        username: string;
        name?: string;
        password: string;
      } | null;
    }

    // Si no existe usuario, rechazar el login
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Usuario no encontrado. Contacta al administrador.",
      });
    }

    // Validar contraseña correctamente
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Contraseña incorrecta",
      });
    }

    res.json({
      success: true,
      token: `token_${Date.now()}`,
      user: {
        id: user.id,
        username: user.username,
        name: user.name || user.username,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
});

// Login de empresa
app.post("/api/auth/company-login", (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    if (!name || !password || name.length === 0 || password.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Nombre de empresa y contraseña son requeridos",
      });
    }

    // Buscar empresa en la BD
    const findCompany = db.prepare("SELECT * FROM companies WHERE name = ?");
    const company = findCompany.get(name) as {
      id: string;
      name: string;
      password: string;
    } | null;

    // Validar existencia
    if (!company) {
      return res.status(401).json({
        success: false,
        message: "Empresa no encontrada",
      });
    }

    // Validar contraseña
    if (company.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Contraseña de empresa incorrecta",
      });
    }

    res.json({
      success: true,
      token: `company_token_${Date.now()}`,
      company: { id: company.id, name: company.name },
    });
  } catch (error) {
    console.error("Error en login de empresa:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
});

// Obtener ubicaciones permitidas
app.get("/api/locations", (_req: Request, res: Response) => {
  try {
    const locations = db
      .prepare("SELECT id, name, latitude, longitude, radius FROM locations")
      .all() as Array<{
      id: string;
      name: string;
      latitude: number;
      longitude: number;
      radius: number;
    }>;

    res.json({ success: true, locations });
  } catch (error) {
    console.error("Error al obtener ubicaciones:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
});

// Crear una nueva ubicación
app.post("/api/locations", (req: Request, res: Response) => {
  try {
    const { name, latitude, longitude, radius } = req.body;
    if (!name || latitude == null || longitude == null) {
      return res
        .status(400)
        .json({ success: false, message: "Faltan datos de ubicación" });
    }

    const newId = generateId();
    const insertLoc = db.prepare(
      `INSERT INTO locations (id, name, latitude, longitude, radius) VALUES (?, ?, ?, ?, ?)`,
    );

    insertLoc.run(newId, name, latitude, longitude, radius ?? GEO_RADIUS);

    return res.json({
      success: true,
      location: {
        id: newId,
        name,
        latitude,
        longitude,
        radius: radius ?? GEO_RADIUS,
      },
    });
  } catch (error) {
    console.error("Error al crear ubicación:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor" });
  }
});

// Editar una ubicación
app.put("/api/locations/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, latitude, longitude, radius } = req.body;

    if (!name || latitude == null || longitude == null) {
      return res
        .status(400)
        .json({ success: false, message: "Faltan datos de ubicación" });
    }

    // Verificar que la ubicación existe
    const existingLoc = db
      .prepare("SELECT * FROM locations WHERE id = ?")
      .get(id);
    if (!existingLoc) {
      return res
        .status(404)
        .json({ success: false, message: "Ubicación no encontrada" });
    }

    const updateLoc = db.prepare(
      `UPDATE locations SET name = ?, latitude = ?, longitude = ?, radius = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    );

    updateLoc.run(name, latitude, longitude, radius ?? GEO_RADIUS, id);

    return res.json({
      success: true,
      location: {
        id,
        name,
        latitude,
        longitude,
        radius: radius ?? GEO_RADIUS,
      },
    });
  } catch (error) {
    console.error("Error al editar ubicación:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor" });
  }
});

// Eliminar una ubicación
app.delete("/api/locations/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Verificar que la ubicación existe
    const existingLoc = db
      .prepare("SELECT * FROM locations WHERE id = ?")
      .get(id);
    if (!existingLoc) {
      return res
        .status(404)
        .json({ success: false, message: "Ubicación no encontrada" });
    }

    // Verificar que no hay check-ins asociados (opcional, pero buena práctica)
    const checkinCount = db
      .prepare("SELECT COUNT(*) as count FROM checkins WHERE location_id = ?")
      .get(id) as { count: number };
    if (checkinCount.count > 0) {
      return res.status(400).json({
        success: false,
        message: "No se puede eliminar una ubicación con check-ins asociados",
      });
    }

    const deleteLoc = db.prepare("DELETE FROM locations WHERE id = ?");
    deleteLoc.run(id);

    return res.json({
      success: true,
      message: "Ubicación eliminada correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar ubicación:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor" });
  }
});

// Validar geolocalización y registrar check-in
app.post("/api/checkin", (req: Request, res: Response) => {
  try {
    const { userId, locationId, userLatitude, userLongitude, action } =
      req.body;

    if (
      !userId ||
      !locationId ||
      userLatitude == null ||
      userLongitude == null
    ) {
      res.status(400).json({
        success: false,
        message: "Parámetros incompletos",
      });
      return;
    }

    // Obtener ubicación de la BD
    const getLocation = db.prepare("SELECT * FROM locations WHERE id = ?");
    const location = getLocation.get(locationId) as {
      id: string;
      name: string;
      latitude: number;
      longitude: number;
      radius: number;
    } | null;

    if (!location) {
      res.status(404).json({
        success: false,
        message: "Ubicación no encontrada",
      });
      return;
    }

    const distance = calculateDistance(
      userLatitude,
      userLongitude,
      location.latitude,
      location.longitude,
    );

    if (distance <= location.radius) {
      // Guardar el check-in en la BD
      const checkinId = generateId();
      const now = new Date().toISOString();
      const insertCheckin = db.prepare(
        `INSERT INTO checkins (
          id, user_id, location_id, action, latitude, longitude, distance, action_time
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      );

      insertCheckin.run(
        checkinId,
        userId,
        locationId,
        action,
        userLatitude,
        userLongitude,
        distance,
        now,
      );

      res.json({
        success: true,
        message: `${
          action === "checkin" ? "Llegada" : "Salida"
        } registrada correctamente`,
        distance: Math.round(distance),
        location: location.name,
        action_time: now,
        timestamp: now,
      });
    } else {
      res.status(403).json({
        success: false,
        message: `Estás a ${Math.round(
          distance,
        )}m de la ubicación permitida. Máximo permitido: ${location.radius}m`,
        distance: Math.round(distance),
        requiredDistance: location.radius,
      });
    }
  } catch (error) {
    console.error("Error en check-in:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
});

// Obtener histórico de check-ins por usuario
app.get("/api/checkins/:userId", (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const checkins = db
      .prepare(
        `SELECT c.*, l.name as location_name
         FROM checkins c
         JOIN locations l ON c.location_id = l.id
         WHERE c.user_id = ?
         ORDER BY c.action_time DESC`,
      )
      .all(userId);

    res.json({ success: true, checkins });
  } catch (error) {
    console.error("Error al obtener checkins:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
});

// Obtener todos los usuarios
app.get("/api/users", (req: Request, res: Response) => {
  try {
    const users = db
      .prepare("SELECT id, username, name FROM users")
      .all() as Array<{
      id: string;
      username: string;
      name?: string;
    }>;

    res.json({ success: true, users });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
});

// Editar usuario (nombre y RUT)
app.put("/api/users/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, name } = req.body;

    if (!username || !name) {
      return res
        .status(400)
        .json({ success: false, message: "RUT y nombre son requeridos" });
    }

    // Verificar que el usuario existe
    const existingUser = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    // Verificar que el nuevo RUT sea único (si cambió)
    const currentUser = existingUser as { username: string };
    if (username !== currentUser.username) {
      const duplicateRut = db
        .prepare("SELECT id FROM users WHERE username = ? AND id != ?")
        .get(username);
      if (duplicateRut) {
        return res
          .status(409)
          .json({ success: false, message: "El RUT ya está registrado" });
      }
    }

    const updateUser = db.prepare(
      "UPDATE users SET username = ?, name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    );
    updateUser.run(username, name, id);

    return res.json({
      success: true,
      message: "Usuario actualizado correctamente",
      user: { id, username, name },
    });
  } catch (error) {
    console.error("Error al editar usuario:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor" });
  }
});

// Eliminar usuario
app.delete("/api/users/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Verificar que el usuario existe
    const existingUser = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    // Eliminar usuario
    const deleteUser = db.prepare("DELETE FROM users WHERE id = ?");
    deleteUser.run(id);

    return res.json({
      success: true,
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor" });
  }
});

// Generar nueva contraseña para un usuario
app.post("/api/users/:id/new-password", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Verificar que el usuario existe
    const existingUser = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    const newPassword = generateSecurePassword();
    const updatePassword = db.prepare(
      "UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    );

    updatePassword.run(newPassword, id);

    return res.json({
      success: true,
      message: "Contraseña generada correctamente",
      password: newPassword,
      username: (existingUser as any).username,
    });
  } catch (error) {
    console.error("Error al generar nueva contraseña:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor" });
  }
});

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Iniciar servidor
function startServer() {
  try {
    initializeDatabase();

    app.listen(PORT, () => {
      console.log(`✓ Servidor ejecutándose en puerto ${PORT}`);
      console.log(`✓ Radio de validación: ${GEO_RADIUS}m`);
      console.log(`✓ Base de datos: ${dbPath}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
}

startServer();
