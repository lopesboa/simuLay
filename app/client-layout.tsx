"use client";

import { useEffect } from "react";
import { useUserStore, type User } from "@/stores/user.store";
import RootLayout from "./layout";

export default function ClientRootLayout({
	children,
	user,
}: {
	children: React.ReactNode;
	user: User | null;
}) {
	const setUser = useUserStore((state) => state.setUser);

	useEffect(() => {
		setUser(user);
	}, [user, setUser]);

	return <>{children}</>;
}
