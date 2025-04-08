"use client";

import React, { Suspense } from "react";

import { SignUpForm } from "@/components/sign-up-form";

export default function SignUpPage() {
	return (
		<Suspense>
			<SignUpForm />
		</Suspense>
	);
}
