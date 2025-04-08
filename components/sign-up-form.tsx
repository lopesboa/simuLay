import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";

import { Field } from "./forms";
import { SubmitButton } from "./submit-button";
import { signUpAction } from "@/lib/actions/auth.action";
import { SignUpFormSchema } from "@/app/utils/user-validation";

export function SignUpForm() {
	const [lastResult, action] = useActionState(signUpAction, undefined);
	const searchParams = useSearchParams();
	const redirectTo = searchParams.get("redirectTo");

	const [form, fields] = useForm({
		id: "sign-up-form",
		constraint: getZodConstraint(SignUpFormSchema),
		defaultValue: { redirectTo },
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: SignUpFormSchema });
		},

		shouldValidate: "onBlur",
	});

	if (form.errors?.length) {
		toast.error(form.errors[0]);
	}

	return (
		<div className="card-border lg:min-w-[566px]">
			<div className="flex flex-col gap-6 card py-14 px-10">
				<div className="flex flex-row gap-2 justify-center">
					<Image src="/logo.svg" alt="logo" height={32} width={38} />
					<h2 className="text-primary-100">SimuLay</h2>
				</div>

				<h3>Practice job interviews with Simulay</h3>

				<div>
					<form
						className="w-full space-y-6 mt-4 form"
						action={action}
						{...getFormProps(form)}
					>
						<Field
							labelProps={{ children: "FistName" }}
							inputProps={{
								...getInputProps(fields.firstName, {
									type: "text",
								}),
								placeholder: "John",
							}}
							errors={fields.firstName.errors}
						/>

						<Field
							labelProps={{ children: "LastName" }}
							inputProps={{
								...getInputProps(fields.lastName, {
									type: "text",
								}),
								placeholder: "Doe",
							}}
							errors={fields.lastName.errors}
						/>

						<Field
							labelProps={{ children: "Email" }}
							inputProps={{
								...getInputProps(fields.email, {
									type: "email",
								}),
								placeholder: "email@example.com",
							}}
							errors={fields.email.errors}
						/>

						<Field
							labelProps={{ children: "Password" }}
							inputProps={{
								...getInputProps(fields.password, {
									type: "password",
								}),
								placeholder: "••••••••",
							}}
							errors={fields.password.errors}
						/>

						<Field
							labelProps={{ children: "Confirm Password" }}
							inputProps={{
								...getInputProps(fields.confirmPassword, {
									type: "password",
								}),
								placeholder: "••••••••",
							}}
							errors={fields.confirmPassword.errors}
						/>

						<SubmitButton className="btn mt-4" type="submit">
							Create an Account
						</SubmitButton>
					</form>
				</div>
				<p className="text-center">
					"Have an account already?"
					<Link href="/sign-in" className="font-bold text-user-primary ml-1">
						Sign In
					</Link>
				</p>
			</div>
		</div>
	);
}
