import { sql } from "drizzle-orm";
import {
	uuid,
	text,
	integer,
	pgTable,
	boolean,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: uuid().primaryKey().defaultRandom(),
	fistName: varchar({ length: 128 }),
	lastName: varchar({ length: 128 }),
	name: varchar({ length: 128 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	emailVerified: boolean().notNull(),
	image: text(),
	createdAt: timestamp({ mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp({ mode: "string" }).$onUpdateFn(() => sql`now()`),
	deletedAt: timestamp({ mode: "string" }),
});

export const session = pgTable("session", {
	id: uuid().primaryKey().defaultRandom(),
	expiresAt: timestamp().notNull(),
	token: text().notNull().unique(),
	createdAt: timestamp().notNull(),
	updatedAt: timestamp().notNull(),
	ipAddress: varchar({ length: 45 }),
	userAgent: varchar({ length: 255 }),
	userId: uuid()
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
	id: uuid().primaryKey().defaultRandom(),
	accountId: uuid().notNull().defaultRandom(),
	providerId: varchar({ length: 20 }).notNull(),
	userId: uuid()
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text(),
	refreshToken: text(),
	idToken: text(),
	accessTokenExpiresAt: timestamp(),
	refreshTokenExpiresAt: timestamp(),
	scope: varchar({ length: 20 }),
	password: text(),
	createdAt: timestamp({ mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp({ mode: "string" }).$onUpdateFn(() => sql`now()`),
	deletedAt: timestamp({ mode: "string" }),
});

export const verification = pgTable("verification", {
	id: uuid().primaryKey().defaultRandom(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp().notNull(),
	createdAt: timestamp({ mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp({ mode: "string" }).$onUpdateFn(() => sql`now()`),
	deletedAt: timestamp({ mode: "string" }),
});
