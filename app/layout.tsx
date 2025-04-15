import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";

import "./globals.css";
import { PostHogProvider } from "../components/PostHogProvider";

const monaSans = Mona_Sans({
	variable: "--font-mona-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "SimuLay AI powered Mock Interviews",
		template: "%s | SimuLay",
	},
	description:
		"Browse and practice from community-contributed mock interviews.",
	openGraph: {
		title: "Community Mock Interviews | SimuLay",
		description: "Practice with interview templates shared by other users.",
	},
	alternates: {
		canonical: "https://simulay.vercel.app",
	},
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className="dark">
			<body className={`${monaSans.className}  antialiased pattern`}>
				<PostHogProvider>
					{children}
					<Toaster />
				</PostHogProvider>
			</body>
		</html>
	);
}
