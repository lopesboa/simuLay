import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { PostHogProvider } from "../components/PostHogProvider";

const monaSans = Mona_Sans({
	variable: "--font-mona-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "SimuLay",
	description: "An AI-powered web platform for preparing for mock interviews",
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
