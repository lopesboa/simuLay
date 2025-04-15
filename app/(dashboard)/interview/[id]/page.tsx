import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";

import { getInterviewById } from "@/app/utils/interview.server";
import { getRandomInterviewCover } from "@/lib/utils";
import { DisplayTeckIcons } from "@/components/display-teck-icons";
import { Agent } from "@/components/agent/agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

export default async function page({ params }: RouteParams) {
	const { id } = await params;
	const interview = await getInterviewById(id);
	const user = await getCurrentUser();

	if (!interview) {
		redirect("/overview");
	}

	return (
		<>
			<div className="flex flex-grow gap-4 justify-between">
				<div className="flex flex-row gap-4 items-center max-sm:flex-col">
					<div className="flex flex-row gap-4 items-center">
						<Image
							src={getRandomInterviewCover()}
							alt="cover-image"
							width={40}
							height={40}
							className="rounded-full object-cover size-[40px]"
						/>
						<h3 className="capitalize">{interview.role} Interview</h3>
					</div>
					<DisplayTeckIcons techStack={interview.techstack} />
				</div>
				<p className="bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize">
					{interview.type}
				</p>
			</div>
			<Agent
				userName={user?.name!}
				type="interview"
				userId={user?.id}
				interviewId={id}
				questions={interview.questions}
			/>
		</>
	);
}
