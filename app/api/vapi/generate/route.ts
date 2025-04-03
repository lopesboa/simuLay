import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { saveInterview } from "@/app/utils/interview.server";
export async function GET() {
	return Response.json({ success: true, data: "Hello World" }, { status: 200 });
}

export async function POST(request: Request) {
	//TODO: Add option to that let user upload the cover image
	const { type, role, level, techstack, amount, userid, coverimage } =
		await request.json();

	try {
		const { text: questions } = await generateText({
			model: google("gemini-2.0-flash-001"),
			prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
		});

		const interview = {
			role,
			type,
			level,
			techstack: techstack.split(","),
			questions: JSON.parse(questions),
			userId: userid,
			finalized: true,
			amount,
			coverImage: getRandomInterviewCover(),
		};

		await saveInterview(interview);

		return Response.json({ success: true }, { status: 200 });
	} catch (error) {
		return Response.json({ success: false, error }, { status: 500 });
	}
}
