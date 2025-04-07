"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Suspense, useActionState, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";

import { Field } from "@/components/forms";
import { loginAction } from "@/lib/actions/auth.action";
import { SubmitButton } from "@/components/submit-button";
import { PasswordInput } from "@/components/password-input";
import { LoginFormSchema } from "@/app/utils/user-validation";

export default function SignInPage() {
	const [lastResult, action] = useActionState(loginAction, undefined);
	const searchParams = useSearchParams();
	const redirectTo = searchParams.get("redirectTo");

	const [showPassword, setShowPassword] = useState(false);

	const [form, fields] = useForm({
		id: "login-form",
		constraint: getZodConstraint(LoginFormSchema),
		defaultValue: { redirectTo },
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: LoginFormSchema });
		},

		shouldValidate: "onBlur",
	});

	const handleOnClick = () => {
		setShowPassword((prev) => !prev);
	};

	if (form.errors?.length) {
		toast.error(form.errors[0]);
	}

	return (
		<Suspense>
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
								labelProps={{ children: "Email" }}
								inputProps={{
									...getInputProps(fields.email, {
										type: "email",
									}),
									placeholder: "email@example.com",
								}}
								errors={fields.email.errors}
							/>

							<PasswordInput
								labelProps={{ children: "Password" }}
								showPassword={showPassword}
								onClick={handleOnClick}
								inputProps={{
									...getInputProps(fields.password, {
										type: showPassword ? "text" : "password",
									}),
									placeholder: "••••••••",
								}}
								errors={fields.password.errors}
							/>

							<SubmitButton className="btn" type="submit">
								{"Sign In"}
							</SubmitButton>
						</form>
					</div>
					<p className="text-center">
						{"No account yet?"}
						<Link
							href={"/sign-up"}
							className="font-bold text-user-primary ml-1"
						>
							{"Sign Up"}
						</Link>
					</p>
				</div>
			</div>
		</Suspense>
	);
}
