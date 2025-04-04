import { z } from "zod";

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 20;

export const PasswordSchema = z
	.string({ required_error: "Password is required" })
	.min(6, { message: "Password is too short" })
	// NOTE: bcrypt has a limit of 72 bytes (which should be plenty long)
	// https://github.com/epicweb-dev/epic-stack/issues/918
	.refine((val) => new TextEncoder().encode(val).length <= 72, {
		message: "Password is too long",
	});

export const NameSchema = z
	.string({ required_error: "Name is required" })
	.min(3, { message: "Name is too short" })
	.max(40, { message: "Name is too long" });

export const EmailSchema = z
	.string({ required_error: "Email is required" })
	.email({ message: "Email is invalid" })
	.min(3, { message: "Email is too short" })
	.max(100, { message: "Email is too long" })
	// users can type the email in any case, but we store it in lowercase
	.transform((value) => value.toLowerCase());

export const PasswordAndConfirmPasswordSchema = z
	.object({ password: PasswordSchema, confirmPassword: PasswordSchema })
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				path: ["confirmPassword"],
				code: "custom",
				message: "The passwords must match",
			});
		}
	});
export const LoginFormSchema = z.object({
	email: EmailSchema,
	password: PasswordSchema,
	redirectTo: z.string().optional(),
	remember: z.boolean().optional(),
});

export const SignupFormSchema = z
	.object({
		firstName: NameSchema,
		lastName: NameSchema,
		email: EmailSchema,
		redirectTo: z.string().optional(),
	})
	.and(PasswordAndConfirmPasswordSchema);
