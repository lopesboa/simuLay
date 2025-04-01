import { validateUserSession } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import React, { type ReactNode } from "react";

export default async function AuthLayout({
	children,
}: { children: ReactNode }) {
	const userSesstion = await validateUserSession();

	if (userSesstion?.id) {
		redirect("/");
	}
	return <div className="auth-layout">{children}</div>;
}
