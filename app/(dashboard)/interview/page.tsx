"use client";

import React from "react";

import { Agent } from "@/components/agent/agent";
import { useUserStore } from "@/stores/user.store";

export default function InterviewPage() {
	const user = useUserStore((state) => state.User);

	return (
		<>
			<h3>Interview Generation</h3>
			<Agent userName={user?.name!} userId={user?.id} type="generate" />
		</>
	);
}
