import React from "react";
import Link from "next/link";
import Image from "next/image";

import {
	getInterviewsByUserId,
	getLatestInterviews,
} from "../../utils/interview.server";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { InterviewCard } from "@/components/interview-card";

export default async function DashboardPage() {
	const user = await getCurrentUser();

	const [userInterviews, latestInterviews] = await Promise.all([
		await getInterviewsByUserId(user?.id),
		await getLatestInterviews({ userId: user?.id }),
	]);

	const hasPastInterviews = userInterviews?.length > 0;
	const hasUpcomingInterviews = latestInterviews?.length > 0;

	return (
		<>
			<section className="card-cta">
				<div className="flex flex-col gap-6 max-w-lg">
					<h2>Get Interview-Ready with AI-Powered Practice and Feedback</h2>
					<p className="text-lg">
						Practice on real interview question & get instant feedback
					</p>
					<Button className="btn-primary">
						<Link href="/interview">Start an Interview</Link>
					</Button>
				</div>

				<Image
					src="/robot.png"
					alt="robot"
					width={400}
					height={400}
					className="max-sm:hidden"
				/>
			</section>

			<section className="flex flex-col gap-6 mt-8">
				<h2>Your Interviews</h2>
				<div className="interviews-section">
					{hasPastInterviews ? (
						userInterviews?.map((interview) => (
							<InterviewCard key={interview.id} {...interview} />
						))
					) : (
						<p>You haven't taken any interviews yet</p>
					)}
				</div>
			</section>
			<section className="flex flex-col gap-6 mt-8">
				<h2>Take an Interview</h2>

				<div className="interviews-section">
					{hasUpcomingInterviews ? (
						latestInterviews?.map((interview) => (
							<InterviewCard key={interview.id} {...interview} />
						))
					) : (
						<p>There ara no interviews available</p>
					)}
				</div>
			</section>
		</>
	);
}
