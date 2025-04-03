"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormField } from "./form-field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn, signUp } from "@/lib/auth-client";
import { SubmitButton } from "./submit-button";

const authFormSchema = (type: FormType) => {
	return z.object({
		firstName: type === "sign-up" ? z.string().min(3) : z.string().optional(),
		lastName: type === "sign-up" ? z.string().min(3) : z.string().optional(),
		email: z.string().email(),
		password: z.string().min(6),
	});
};

type AuthFormProps = {
	type: FormType;
};

export function AuthForm({ type }: AuthFormProps) {
	const router = useRouter();
	const formSchema = authFormSchema(type);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			firstName: "",
			lastName: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			if (type === "sign-up") {
				const { error, data } = await signUp.email(
					{
						name: `${values.firstName} ${values.lastName}`,
						email: values.email,
						password: values.password,
						callbackURL: process.env.NEXT_PUBLIC_CALLBACK_URL,
					},
					{
						onRequest: (ctx) => {},
						onSuccess: (ctx) => {
							toast.success(
								"Account created successfully, please check your email to verify your account",
							);
						},
						onError: (ctx) => {
							toast.error(ctx.error.message);
						},
					},
				);
			} else {
				const { email, password } = values;
				const { error, data } = await signIn.email(
					{
						email,
						password,
						callbackURL: process.env.NEXT_PUBLIC_CALLBACK_URL,
					},
					{
						onRequest: (ctx) => {},
						onSuccess: (ctx) => {
							router.push("/");
						},
						onError: (ctx) => {
							toast.error(ctx.error.message);
						},
					},
				);
			}
		} catch (error) {
			//TODO: Remove the eroor from the taost, it should be used only on dev env
			toast.error(`Something went wrong ${error}`);
		}
	}

	const isSignIn = type === "sign-in";

	return (
		<div className="card-border lg:min-w-[566px]">
			<div className="flex flex-col gap-6 card py-14 px-10">
				<div className="flex flex-row gap-2 justify-center">
					<Image src="/logo.svg" alt="logo" height={32} width={38} />
					<h2 className="text-primary-100">SimuLay</h2>
				</div>

				<h3>Practice job interviews with Simulay</h3>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full space-y-6 mt-4 form"
					>
						{!isSignIn && (
							<>
								<FormField
									control={form.control}
									name="firstName"
									label="First Name"
									placeholder="John"
									type="text"
								/>
								<FormField
									control={form.control}
									name="lastName"
									label="Last Name"
									placeholder="Doe"
									type="text"
								/>
							</>
						)}
						<FormField
							control={form.control}
							name="email"
							label="Email"
							placeholder="johndoe@email.com"
							type="email"
						/>

						<FormField
							control={form.control}
							name="password"
							label="Password"
							placeholder="****************"
							type="password"
						/>

						<SubmitButton className="btn" type="submit">
							{isSignIn ? "Sign In" : "Create an Account"}
						</SubmitButton>
					</form>
				</Form>
				<p className="text-center">
					{isSignIn ? "No account yet?" : "Have an account already?"}
					<Link
						href={isSignIn ? "/sign-up" : "/sign-in"}
						className="font-bold text-user-primary ml-1"
					>
						{isSignIn ? "Sign Up" : "Sign In"}
					</Link>
				</p>
			</div>
		</div>
	);
}
