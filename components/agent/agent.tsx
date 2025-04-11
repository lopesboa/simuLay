"use client";

import Image from "next/image";
import * as sentry from "@sentry/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi/sdk";
import { CALL_STATUS } from "./contants";
import { interviewer } from "@/constants";
import { CallStatusButton } from "./call-status";
import type { SavedMessage, CallStatus } from "./types";
import { TranscriptMessage } from "./transcript-message";

export function Agent({
	userName,
	userId,
	type,
	interviewId,
	questions,
}: AgentProps) {
	const router = useRouter();
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [callStatus, setCallStatus] = useState<CallStatus>(
		CALL_STATUS.INACTIVE,
	);
	const [messages, setMessages] = useState<SavedMessage[]>([]);

	const isCallInactiveOrFinished = [
		CALL_STATUS.INACTIVE,
		CALL_STATUS.FINISHED,
	].includes(callStatus);
	const latestMessage = messages?.[messages.length - 1]?.content;

	const handleCall = async () => {
		setCallStatus(CALL_STATUS.CONNECTING);
		if (type === "generate") {
			await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID, {
				variableValues: {
					username: userName,
					userid: userId,
				},
			});
		} else {
			let formattedQuestion = "";
			if (questions?.length) {
				formattedQuestion = questions
					?.map((question) => `${question}`)
					.join("\n");
			}

			await vapi.start(interviewer, {
				variableValues: {
					username: userName,
					userid: userId,
					questions: formattedQuestion,
				},
			});
		}
	};

	const handleDisconnect = async () => {
		setCallStatus(CALL_STATUS.FINISHED);
		await vapi.stop();
	};

	useEffect(() => {
		const onCallStart = () => {
			setCallStatus(CALL_STATUS.ACTIVE);
		};

		const onCallEnd = () => {
			setCallStatus(CALL_STATUS.FINISHED);
		};
		const onMessage = (message: Message) => {
			if (message.type === "transcript" && message.transcriptType === "final") {
				const newMessage = { role: message.role, content: message.transcript };
				setMessages((prevMessages) => [...prevMessages, newMessage]);
			}
		};

		const onSpeechStqart = () => {
			setIsSpeaking(true);
		};

		const onSpeechEnd = () => {
			setIsSpeaking(false);
		};

		const onError = (error: Error) => {
			console.error(error);
		};

		vapi.on("call-start", onCallStart);
		vapi.on("call-end", onCallEnd);
		vapi.on("message", onMessage);
		vapi.on("speech-start", onSpeechStqart);
		vapi.on("speech-end", onSpeechEnd);
		vapi.on("error", onError);

		return () => {
			vapi.off("call-start", onCallStart);
			vapi.off("call-end", onCallEnd);
			vapi.off("message", onMessage);
			vapi.off("speech-start", onSpeechStqart);
			vapi.off("speech-end", onSpeechEnd);
			vapi.off("error", onError);
		};
	}, []);

	const handleGenerateFeedback = async (messages: SavedMessage[]) => {
		const { success, id } = { success: true, id: "feedback-id" };

		if (success && id) {
			router.push(`/interview/${interviewId}/feedback`);
		} else {
			sentry.captureException("Error generating feedback", {
				user: { id: userId },
				extra: { messages, id, interviewId },
			});
			router.push("/");
		}
	};

	useEffect(() => {
		if (callStatus === CALL_STATUS.FINISHED) {
			if (type === "generate") {
				router.push("/");
			} else {
				handleGenerateFeedback(messages);
			}
		}
	}, [callStatus]);

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

			<TranscriptMessage messages={messages} latestMessage={latestMessage} />

			<CallStatusButton
				callStatus={callStatus}
				isCallInactiveOrFinished={isCallInactiveOrFinished}
				handleCall={handleCall}
				handleDisconnect={handleDisconnect}
			/>
		</>
	);
}
