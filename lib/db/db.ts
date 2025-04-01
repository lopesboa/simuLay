import { drizzle } from "drizzle-orm/node-postgres";
import postgres from "postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: process.env.NODE_ENV === "production",
	max: process.env.DB_MIGRATING || process.env.DB_SEEDING ? 1 : undefined,
});

export const db = drizzle({
	casing: "snake_case",
	client: pool,
	logger: process.env.NODE_ENV === "development",
	schema,
});
