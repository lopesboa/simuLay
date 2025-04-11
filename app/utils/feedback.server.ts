"use server";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import * as sentry from "@sentry/nextjs";

import { db } from "@/lib/db/db";
import { feedbacks } from "@/lib/db/schema";
import { feedbackSchema } from "@/constants";

async function generateFeedback(
	formattedTranscript: string,
	interviewId: string,
	userId: string,
) {
	try {
		const {
			object: {
				totalScore,
				categoryScores,
				areasForImprovement,
				strengths,
				finalAssessment,
			},
		} = await generateObject({
			model: google("gemini-2.0-flash-001", { structuredOutputs: false }),
			schema: feedbackSchema,
			prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
			system:
				"You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
		});

		return {
			interviewId,
			userId,
			totalScore,
			categoryScores,
			strengths,
			areasForImprovement,
			finalAssessment,
		};
	} catch (error) {
		sentry.captureException(error, {
			tags: { function: "generateFeedback" },
		});
	}
}

export async function createFeedback({
	interviewId,
	userId,
	transcript,
}: CreateFeedbackParams) {
	try {
		const formattedTranscript = transcript
			?.map(
				(sentence: { role: string; content: string }) =>
					`- ${sentence.role}: ${sentence.content}\n`,
			)
			.join("");

		const feedback = await generateFeedback(
			formattedTranscript,
			interviewId,
			userId,
		);

		if (!feedback) {
			sentry.captureException("Failed to generate feedback", {
				user: { id: userId },
				extra: { formattedTranscript, interviewId, userId },
			});
			throw new Error("Failed to generate feedback");
		}

		const result = await db
			.insert(feedbacks)
			.values({
				...feedback,
			})
			.returning();

		return {
			success: true,
			feedbackId: result[0].id,
		};
	} catch (error) {
		sentry.captureException(error, {
			tags: { function: "createFeedback" },
		});
		return {
			success: false,
		};
	}
}
