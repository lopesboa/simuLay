import sentry from "@sentry/nextjs";
import { and, eq, not, type InferModel } from "drizzle-orm";

import { db } from "@/lib/db/db";
import { interviews } from "@/lib/db/schema";

export async function saveInterview(
	data: InferModel<typeof interviews, "insert">,
) {
	try {
		await db.insert(interviews).values({ ...data });
	} catch (error) {
		sentry.captureException(error, {
			tags: { function: "saveInterview" },
		});
	}
}

export async function getInterviewsByUserId(userId: string) {
	try {
		return await db.query.interviews.findMany({
			where: eq(interviews.userId, userId),
			orderBy: (interviews, { desc }) => [desc(interviews.createdAt)],
			columns: {
				id: true,
				role: true,
				level: true,
				questions: true,
				techstack: true,
				createdAt: true,
				userId: true,
				type: true,
				finalized: true,
				// amount: true,
				// coverImage: true,
			},
		});
	} catch (error) {
		sentry.captureException(error, {
			tags: { function: "getInterviewsByUserId" },
		});
	}
}

export function getLatestInterviews(params: GetLatestInterviewsParams) {
	const { userId, limit = 20 } = params;
	try {
		return db.query.interviews.findMany({
			where: and(
				not(eq(interviews.userId, userId)),
				eq(interviews.finalized, true),
			),
			orderBy: (interviews, { desc }) => [desc(interviews.createdAt)],
			limit,
			columns: {
				id: true,
				role: true,
				level: true,
				questions: true,
				techstack: true,
				createdAt: true,
				userId: true,
				type: true,
				finalized: true,
				// amount: true,
				// coverImage: true,
			},
		});
	} catch (error) {
		sentry.captureException(error, {
			tags: { function: "getLatestInterviews" },
		});
	}
}

export async function getInterviewById(id: string) {
	try {
		return await db.query.interviews.findFirst({
			where: eq(interviews.id, id),
			orderBy: (interviews, { desc }) => [desc(interviews.createdAt)],
			columns: {
				id: true,
				role: true,
				level: true,
				questions: true,
				techstack: true,
				createdAt: true,
				userId: true,
				type: true,
				finalized: true,
				// amount: true,
				// coverImage: true,
			},
		});
	} catch (error) {
		sentry.captureException(error, {
			tags: { function: "getInterviewsById" },
		});
	}
}
