import { db } from "@/lib/db/db";
import { interviews } from "@/lib/db/schema";
import { eq, type InferModel } from "drizzle-orm";

export async function saveInterview(
	data: InferModel<typeof interviews, "insert">,
) {
	try {
		console.log("starting save interview", data);
		await db.insert(interviews).values({ ...data });
		console.log("interview saved");
	} catch (error) {
		console.log("error saving interview", error);
	}
}

export async function getInterviewsByUserId(userId: string) {
	return await db.query.interviews.findMany({
		where: eq(interviews.userId, userId),
		orderBy: (interviews, { desc }) => [desc(interviews.createdAt)],
		limit: 5,
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
}
