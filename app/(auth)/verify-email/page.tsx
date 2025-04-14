import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare, Mail, AlertCircle } from "lucide-react";

import {
	Card,
	CardTitle,
	CardHeader,
	CardFooter,
	CardContent,
	CardDescription,
} from "@/components/ui/card";

export default function VerificationEmailPage() {
	return (
		<div className="flex min-h-screen flex-col">
			<main className="flex-1 flex items-center justify-center p-4 md:p-8">
				<Card className="mx-auto max-w-md w-full">
					<CardHeader className="text-center">
						<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
							<Mail className="h-8 w-8 text-primary" />
						</div>
						<CardTitle className="text-2xl">Check your email</CardTitle>
						<CardDescription>
							We've sent a verification link to your email address
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<p className="text-center text-sm text-muted-foreground">
							Please click the link in the email we sent to verify your account
							and continue setting up your profile.
						</p>

						<div className="rounded-lg bg-muted p-4">
							<div className="flex items-start gap-4">
								<AlertCircle className="mt-0.5 h-5 w-5 text-muted-foreground" />
								<div className="space-y-1">
									<p className="text-sm font-medium">Can't find the email?</p>
									<ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
										<li>Check your spam or junk folder</li>
										<li>Make sure you entered the correct email address</li>
										<li>Allow a few minutes for the email to arrive</li>
									</ul>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
