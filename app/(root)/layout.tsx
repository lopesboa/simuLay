import Link from "next/link";
import Image from "next/image";
import React, { type ReactNode } from "react";
import { validateUserSession } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import { useUserStore, User } from "@/stores/user.store";
import ClientRootLayout from "../client-layout";

export default async function RootLayout({
	children,
}: { children: ReactNode }) {
	const userSesstion = await validateUserSession();

	if (!userSesstion?.id) {
		redirect("/sign-in");
	}

	return (
		<ClientRootLayout user={userSesstion}>
			<div className="root-layout">
				<nav>
					<Link href="/" className="flex items-center gap-2">
						<Image src="/logo.svg" alt="logo" width={32} height={38} />
						<h2 className="text-primary-100">SimuLay</h2>
					</Link>
				</nav>
				{children}
			</div>
		</ClientRootLayout>
	);
}
