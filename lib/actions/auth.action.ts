"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";

import { auth } from "@/lib/auth";
import { LoginFormSchema, SignUpFormSchema } from "@/app/utils/user-validation";

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

export async function signInAction(state, formData) {
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

export async function signUpAction(state, formData) {
	const submission = await parseWithZod(formData, {
		schema: (intent) =>
			SignUpFormSchema.transform(async (data, ctx) => {
				if (intent !== null) return { ...data, session: null };
				try {
					await auth.api.signUpEmail({
						body: {
							email: data.email,
							password: data.password,
							name: `${data.firstName} ${data.lastName}`,
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

	redirect("/verify-email");
}
