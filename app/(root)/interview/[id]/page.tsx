import { getInterviewById } from "@/app/utils/interview.server";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({ params }: RouteParams) {
	const { id } = await params;
	const interview = await getInterviewById(id);

	if (!interview) {
		redirect("/");
	}

	return <div>page {interview.techstack}</div>;
}
