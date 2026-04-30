import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const companies = sqliteTable("companies", {
  id: text("id").primaryKey(),
  name: text("name").unique().notNull(),
  password: text("password").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  username: text("username").unique().notNull(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  cargo: text("cargo").notNull(),
  jornada: text("jornada").notNull(),
  password: text("password").notNull(),
  companyId: text("company_id")
    .notNull()
    .references(() => companies.id),
  status: text("status").default("pending").notNull(), // pending, approved, rejected
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const locations = sqliteTable("locations", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  radius: integer("radius").default(50),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const checkins = sqliteTable("checkins", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  locationId: text("location_id")
    .notNull()
    .references(() => locations.id),
  action: text("action").notNull(), // 'checkin' or 'checkout'
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  distance: real("distance"),
  signature: text("signature"),
  payloadHash: text("payload_hash"),
  prevChainHash: text("prev_chain_hash"),
  chainHash: text("chain_hash"),
  receiptStatus: text("receipt_status").default("pending"),
  receiptSentAt: text("receipt_sent_at"),
  receiptError: text("receipt_error"),
  actionTime: text("action_time")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  timestamp: text("timestamp").default(sql`CURRENT_TIMESTAMP`),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const adminMessages = sqliteTable("admin_messages", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
  type: text("type").notNull(), // 'password_reset', etc.
  status: text("status").default("pending"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  resolvedAt: text("resolved_at"),
  resolvedBy: text("resolved_by"),
});

export const auditTrail = sqliteTable("audit_trail", {
  id: text("id").primaryKey(),
  action: text("action").notNull(),
  actorType: text("actor_type").notNull(),
  actorId: text("actor_id").notNull(),
  targetUserId: text("target_user_id"),
  sourceIp: text("source_ip"),
  userAgent: text("user_agent"),
  detailsJson: text("details_json"),
  detailsHash: text("details_hash"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});
