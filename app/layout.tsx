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
		default: "SimuLay | AI-Powered Mock Interviews",
		template: "%s | SimuLay",
	},
	description:
		"Practice mock interviews with AI. Get realistic questions tailored to your job description or choose from community templates.",
	keywords: [
		"mock interview",
		"AI interview prep",
		"job practice",
		"career training",
		"interview simulator",
	],
	metadataBase: new URL("https://simulay.vercel.app"),
	openGraph: {
		title: "SimuLay: AI Mock Interview Platform",
		description:
			"An AI-powered web platform for preparing for mock interviews that help you ace your next job interview.",
		url: "https://simulay.vercel.app",
		siteName: "SimuLay",
		// images: [
		// 	{
		// 		url: "/og-image.png",
		// 		width: 1200,
		// 		height: 630,
		// 	},
		// ],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "SimuLay: AI Mock Interview Platform",
		description: "Practice with AI-generated interview questions.",
		// images: ["/twitter-image.png"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
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
