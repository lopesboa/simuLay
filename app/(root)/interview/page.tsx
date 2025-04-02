import { Agent } from "@/components/agent";
import React from "react";

export default function InterviewPage() {
	return (
		<>
			<h3>Interview Generation</h3>
			<Agent userName="John Doe" userId="123" type="generate" />
		</>
	);
}
