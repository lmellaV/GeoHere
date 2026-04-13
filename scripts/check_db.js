import Database from 'better-sqlite3';
import path from 'path';

const dbPath = './app.db';
const db = new Database(dbPath);

console.log('--- Companies ---');
const companies = db.prepare('SELECT id, name FROM companies').all();
console.log(JSON.stringify(companies, null, 2));

console.log('\n--- Users ---');
const users = db.prepare('SELECT id, username, name FROM users').all();
console.log(JSON.stringify(users, null, 2));
