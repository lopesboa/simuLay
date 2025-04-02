import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const CALL_STATUS = {
	INACTIVE: "INACTIVE",
	CONNECTING: "CONNECTING",
	ACTIVE: "ACTIVE",
	FINISHED: "FINISHED",
};

type CallStatus = (typeof CALL_STATUS)[keyof typeof CALL_STATUS];

export function Agent({ userName }: AgentProps) {
	const isSpeaking = true;
	const callStatus: CallStatus = CALL_STATUS.FINISHED;
	const messages = [
		"Whats your name?",
		"My name is John Doe, nice to meet you!",
	];
	const lastMessages = messages[messages.length - 1];

	return (
		<>
			<div className="call-view">
				<div className="card-interviewer">
					<div className="avatar">
						<Image
							src="/ai-avatar.png"
							alt="vapi"
							width={65}
							height={54}
							className="object-cover"
						/>
						{isSpeaking && <span className="animate-speak" />}
					</div>
					<h3>Ai Interviewer</h3>
				</div>
				<div className="card-border">
					<div className="card-content">
						<Image
							src="/user-avatar.png"
							alt="user avatar"
							width={540}
							height={540}
							className="rounded-full object-cover size-[120px]"
						/>
						<h3>{userName}</h3>
					</div>
				</div>
			</div>

			{messages.length > 0 && (
				<div className="transcript-border">
					<div className="transcript">
						<p
							key={lastMessages}
							className={cn(
								"transiton-opacity duration-500 opacity-0",
								"animate-fadeIn opacity-100",
							)}
						>
							{lastMessages}
						</p>
					</div>
				</div>
			)}

			<div className="w-full flex justify-center">
				{callStatus !== CALL_STATUS.ACTIVE ? (
					<button type="button" className="relative btn-call">
						<span
							className={cn(
								"absolute animate-ping rounded-full opacity-75",
								(callStatus !== CALL_STATUS.CONNECTING) & "hidden",
							)}
						/>
						<span>
							{[CALL_STATUS.INACTIVE, CALL_STATUS.FINISHED].includes(callStatus)
								? "Call"
								: ". . ."}
						</span>
					</button>
				) : (
					<button type="button" className="btn-disconnect">
						End
					</button>
				)}
			</div>
		</>
	);
}
