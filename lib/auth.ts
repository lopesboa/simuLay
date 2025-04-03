import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "./db/db";
import * as schema from "./db/schema";
import { resend } from "./email/resend";
import { reactVerifyEmail } from "./email/email-verification";
import { reactResetPasswordEmail } from "./email/reset-password";

const from = process.env.SIMULAY_EMAIL!;

export const auth = betterAuth({
	appName: "Simulay",
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	emailVerification: {
		autoSignInAfterVerification: true,
		async sendVerificationEmail({ user, url }) {
			const res = await resend.emails.send({
				from,
				to: user.email,
				subject: "Verify your email address",
				react: reactVerifyEmail({
					validationCode: url,
				}),
			});
		},
	},
	account: {
		accountLinking: {
			trustedProviders: ["google", "apple"],
		},
	},
	emailAndPassword: {
		autoSignIn: false,
		enabled: true,
		requireEmailVerification: true,
		async sendResetPassword({ user, url }) {
			await resend.emails.send({
				from,
				to: user.email,
				subject: "Reset your password",
				react: reactResetPasswordEmail({
					username: user.email,
					resetLink: url,
				}),
			});
		},
	},
	plugins: [nextCookies()],
	advanced: {
		generateId: false,
	},
});
