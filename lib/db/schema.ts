import {
	uuid,
	text,
	jsonb,
	varchar,
	integer,
	pgTable,
	boolean,
	timestamp,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const user = pgTable("user", {
	id: uuid().primaryKey().defaultRandom(),
	firstName: varchar({ length: 128 }),
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

export const interviews = pgTable("interviews", {
	id: uuid().primaryKey().defaultRandom(),
	role: varchar({ length: 100 }).notNull(),
	type: varchar({ length: 50 }).notNull(),
	level: varchar({ length: 50 }).notNull(),
	techstack: text().array().notNull(),
	questions: text().array().notNull(),
	userId: uuid()
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	finalized: boolean().notNull().default(false),
	amount: integer().notNull(),
	coverImage: text().notNull(),
	createdAt: timestamp().notNull().defaultNow(),
});

//TODO: In future it may be better approach to have a normalized table for categories.
//instead of just using jsonb.

export const feedbacks = pgTable("feedbacks", {
	id: uuid().primaryKey().defaultRandom(),
	totalScore: integer().notNull(),
	categoryScores: jsonb().notNull().$type<
		Array<{
			name:
				| "Communication Skills"
				| "Technical Knowledge"
				| "Problem Solving"
				| "Cultural Fit"
				| "Confidence and Clarity";
			score: number;
			comment: string;
		}>
	>(),
	strengths: text().array().notNull(),
	areasForImprovement: text().array().notNull(),
	finalAssessment: text().notNull(),
	interviewId: uuid().references(() => interviews.id, { onDelete: "cascade" }),
	userId: uuid().notNull(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const userRelations = relations(user, ({ many, one }) => ({
	sessions: many(session),
	accounts: many(account),
	interviews: many(interviews),
	feedbacks: many(feedbacks),
}));

export const interviewsRelations = relations(interviews, ({ one }) => ({
	user: one(user, {
		fields: [interviews.userId],
		references: [user.id],
	}),
	feedback: one(feedbacks, {
		fields: [interviews.id],
		references: [feedbacks.interviewId],
	}),
}));

export const feedbackRelations = relations(feedbacks, ({ one }) => ({
	user: one(user, {
		fields: [feedbacks.userId],
		references: [user.id],
	}),
	interview: one(interviews, {
		fields: [feedbacks.interviewId],
		references: [interviews.id],
	}),
}));
