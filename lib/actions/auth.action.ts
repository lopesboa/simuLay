import { headers } from "next/headers";
import { and, eq, isNull } from "drizzle-orm";

import { db } from "@/lib/db/db";
import { auth } from "@/lib/auth";
import { user } from "../db/schema";

export async function validateUserSession() {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session) {
			return null;
		}

		const currentTime = new Date();
		const expiresAt = new Date(session?.session.expiresAt);
		if (expiresAt < currentTime) {
			return null;
		}

		return session.user;
	} catch (error) {
		return null;
	}
}
