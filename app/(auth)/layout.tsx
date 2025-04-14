import type { Metadata } from "next";
import { redirect } from "next/navigation";
import React, { type ReactNode } from "react";

import { validateUserSession } from "@/lib/actions/auth.action";

export const metadata: Metadata = {
	title: "Sign In | SimuLay",
	description:
		"Log in to SimuLay to start practicing AI-powered mock interviews.",
	robots: {
		index: false,
		follow: false,
	},
};

export default async function AuthLayout({
	children,
}: { children: ReactNode }) {
	const userSesstion = await validateUserSession();

	if (userSesstion?.id) {
		redirect("/");
	}
	return <div className="auth-layout">{children}</div>;
}
