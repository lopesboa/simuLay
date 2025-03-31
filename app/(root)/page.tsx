import React from "react";
import Link from "next/link";
import Image from "next/image";

import { dummyInterviews } from "@/constants";
import { Button } from "@/components/ui/button";
import { InterviewCard } from "@/components/interview-card";

export default function RootPage() {
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
					{/* <p>You haven't taken any interviews yet</p> */}
					{dummyInterviews.map((interview) => (
						<InterviewCard key={interview.id} {...interview} />
					))}
				</div>
			</section>
			<section className="flex flex-col gap-6 mt-8">
				<h2>Take an Interview</h2>

				<div className="interviews-section">
					{/* <p>There ara no interviews available</p> */}
					{dummyInterviews.map((interview) => (
						<InterviewCard key={interview.id} {...interview} />
					))}
				</div>
			</section>
		</>
	);
}
