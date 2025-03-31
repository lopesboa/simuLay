import Image from "next/image";
import Link from "next/link";
import React, { type ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<div className="root-layout">
			<nav>
				<Link href="/" className="flex items-center gap-2">
					<Image src="/logo.svg" alt="logo" width={32} height={38} />
					<h2 className="text-primary-100">SimuLay</h2>
				</Link>
			</nav>
			{children}
		</div>
	);
}
