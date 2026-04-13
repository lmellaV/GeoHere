import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const companies = sqliteTable('companies', {
  id: text('id').primaryKey(),
  name: text('name').unique().notNull(),
  password: text('password').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  username: text('username').unique().notNull(),
  name: text('name'),
  password: text('password').notNull(),
  companyId: text('company_id').references(() => companies.id),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const locations = sqliteTable('locations', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  latitude: real('latitude').notNull(),
  longitude: real('longitude').notNull(),
  radius: integer('radius').default(50),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const checkins = sqliteTable('checkins', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  locationId: text('location_id').notNull().references(() => locations.id),
  action: text('action').notNull(), // 'checkin' or 'checkout'
  latitude: real('latitude').notNull(),
  longitude: real('longitude').notNull(),
  distance: real('distance'),
  actionTime: text('action_time').notNull().default(sql`CURRENT_TIMESTAMP`),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const adminMessages = sqliteTable('admin_messages', {
  id: text('id').primaryKey(),
  username: text('username').notNull(),
  type: text('type').notNull(), // 'password_reset', etc.
  status: text('status').default('pending'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  resolvedAt: text('resolved_at'),
  resolvedBy: text('resolved_by'),
});
