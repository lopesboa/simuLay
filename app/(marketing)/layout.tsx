import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import React, { type ReactNode } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default async function MarketingLayout({
	children,
}: { children: ReactNode }) {
	return (
		<div>
			<header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container flex h-16 items-center justify-between">
					<Link href="/" className="flex items-center gap-2">
						<MessageSquare className="h-6 w-6 text-primary" />
						<span className="text-xl font-bold">Simulay</span>
					</Link>
					{/* <nav className="hidden md:flex gap-6"> */}
					{/* 	<Link */}
					{/* 		href="#features" */}
					{/* 		className="text-sm font-medium transition-colors hover:text-primary" */}
					{/* 	> */}
					{/* 		Features */}
					{/* 	</Link> */}
					{/* 	<Link */}
					{/* 		href="#benefits" */}
					{/* 		className="text-sm font-medium transition-colors hover:text-primary" */}
					{/* 	> */}
					{/* 		Benefits */}
					{/* 	</Link> */}
					{/* 	<Link */}
					{/* 		href="#testimonials" */}
					{/* 		className="text-sm font-medium transition-colors hover:text-primary" */}
					{/* 	> */}
					{/* 		Testimonials */}
					{/* 	</Link> */}
					{/* </nav> */}
					<div className="flex items-center gap-4">
						<Link
							href="/sign-in"
							className="text-sm font-medium hover:underline underline-offset-4"
						>
							Sign In
						</Link>
						<Button asChild>
							<Link href="/sign-up">Get Started</Link>
						</Button>
					</div>
				</div>
			</header>

			{children}
			<footer className="w-full border-t bg-background py-6 md:py-8">
				<div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
					<Link href="/" className="flex items-center gap-2">
						<MessageSquare className="h-5 w-5 text-primary" />
						<span className="text-lg font-semibold">Simulay</span>
					</Link>
					<p className="text-center text-sm text-muted-foreground md:text-left">
						&copy; {new Date().getFullYear()} Simulay. All rights reserved.
					</p>
					<nav className="flex gap-4 sm:gap-6">
						<Link
							href="#"
							className="text-sm font-medium hover:underline underline-offset-4"
						>
							Privacy
						</Link>
						<Link
							href="#"
							className="text-sm font-medium hover:underline underline-offset-4"
						>
							Terms
						</Link>
						<Link
							href="#"
							className="text-sm font-medium hover:underline underline-offset-4"
						>
							Contact
						</Link>
					</nav>
				</div>
			</footer>
		</div>
	);
}
