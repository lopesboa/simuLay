import { db } from "@/lib/db/db";
import { interviews } from "@/lib/db/schema";

export async function saveInterview(data) {
	await db.insert(interviews).values({ ...data });
}
