import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import React, { type ReactNode } from "react";

import ClientRootLayout from "../client-layout";
// import { SiteHeader } from "./_components/site-header";
// import { AppSidebar } from "./_components/app-sidebar";
import { useUserStore, User } from "@/stores/user.store";
import { validateUserSession } from "@/lib/actions/auth.action";
// import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
	title: "Interviews | SimuLay",
	description: "An AI-powered web platform for preparing for mock interviews",
};

export default async function RootLayout({
	children,
}: { children: ReactNode }) {
	const userSesstion = await validateUserSession();

	if (!userSesstion?.id) {
		redirect("/sign-in");
	}

	return (
		<ClientRootLayout user={userSesstion}>
			{/* <SidebarProvider> */}
			{/* <AppSidebar variant="inset" /> */}
			{/* <SidebarInset> */}
			{/* <SiteHeader /> */}
			<div className="root-layout">{children}</div>
			{/* </SidebarInset> */}
			{/* </SidebarProvider> */}
		</ClientRootLayout>
	);
}
