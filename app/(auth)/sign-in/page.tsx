"use client";

import { Suspense } from "react";

import { LogInForm } from "@/components/login-form";

export default function SignInPage() {
	return (
		<Suspense>
			<LogInForm />
		</Suspense>
	);
}
