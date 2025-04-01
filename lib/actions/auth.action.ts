import { headers } from "next/headers";
import { and, eq, isNull } from "drizzle-orm";

import { db } from "@/lib/db/db";
import { auth } from "@/lib/auth";
import { user } from "../db/schema";

async function getUserFromSession() {
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

		return session;
	} catch (error) {
		return null;
	}
}

export async function validateUserSession() {
	try {
		const session = await getUserFromSession();

		if (!session) {
			return null;
		}

		const userResult = await db.query.user.findFirst({
			where: and(
				eq(user.id, session.user.id),
				isNull(user.deletedAt),
				eq(user.emailVerified, true),
			),
			columns: {
				id: true,
				name: true,
				email: true,
				image: true,
			},
		});

		if (!userResult) {
			return null;
		}

		return userResult;
	} catch (error) {
		return null;
	}
}
