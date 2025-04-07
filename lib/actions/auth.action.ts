"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";

import { auth } from "@/lib/auth";
import { LoginFormSchema } from "@/app/utils/user-validation";

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

export async function loginAction(state, formData) {
	const submission = await parseWithZod(formData, {
		schema: (intent) =>
			LoginFormSchema.transform(async (data, ctx) => {
				if (intent !== null) return { ...data, session: null };
				try {
					await auth.api.signInEmail({
						body: {
							email: data.email,
							password: data.password,
						},
					});
				} catch (error) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: error?.message,
					});
				}
			}),
		async: true,
	});

	if (submission.status !== "success") {
		return submission.reply();
	}

	redirect("/");
}
