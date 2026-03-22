import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import path from 'path';

const dbPath = path.join(process.cwd(), 'app.db');
const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });

// Auto-run init in dev or if needed
// In Next.js, this might run multiple times, but the init.ts handles checks
import { initializeDatabase } from './init';
initializeDatabase();
