import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";

import { ErrorList, Field } from "./forms";
import { SubmitButton } from "./submit-button";
import { PasswordInput } from "./password-input";
import { signInAction } from "@/lib/actions/auth.action";
import { LoginFormSchema } from "@/app/utils/user-validation";
import posthog from "posthog-js";

export function LogInForm() {
	const [lastResult, action] = useActionState(signInAction, undefined);
	const searchParams = useSearchParams();
	const redirectTo = searchParams.get("redirectTo");

	const [showPassword, setShowPassword] = useState(false);

	const [form, fields] = useForm({
		id: "singup-form",
		constraint: getZodConstraint(LoginFormSchema),
		defaultValue: { redirectTo },
		lastResult,

		onValidate({ formData }) {
			const result = parseWithZod(formData, { schema: LoginFormSchema });

			return result;
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
							labelProps={{
								htmlFor: fields.email.id,
								children: "Email",
							}}
							inputProps={{
								...getInputProps(fields.email, { type: "email" }),
								autoFocus: true,
								autoComplete: "email",

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

						<div>
							<ErrorList errors={form.errors} id={form.errorId} />
							<SubmitButton
								className="btn"
								type="submit"
								aria-label="submit-btn"
							>
								{"Sign In"}
							</SubmitButton>
						</div>
					</form>
				</div>
				<p className="text-center">
					{"No account yet?"}
					<Link href={"/sign-up"} className="font-bold text-user-primary ml-1">
						{"Sign Up"}
					</Link>
				</p>
			</div>
		</div>
	);
}
