import React from "react";

import { cn } from "@/lib/utils";
import { CALL_STATUS } from "./contants";

type CallStatusProps = {
	callStatus: string;
	isCallInactiveOrFinished: boolean;
	handleCall: () => Promise<void>;
	handleDisconnect: () => Promise<void>;
};

export function CallStatusButton({
	callStatus,
	isCallInactiveOrFinished,
	handleCall,
	handleDisconnect,
}: CallStatusProps) {
	return (
		<div className="w-full flex justify-center">
			{callStatus !== CALL_STATUS.ACTIVE ? (
				<button
					type="button"
					className="relative btn-call"
					onClick={handleCall}
				>
					<span
						className={cn(
							"absolute animate-ping rounded-full opacity-75",
							callStatus !== CALL_STATUS.CONNECTING && "hidden",
						)}
					/>
					<span>{isCallInactiveOrFinished ? "Call" : ". . ."}</span>
				</button>
			) : (
				<button
					type="button"
					className="btn-disconnect"
					onClick={handleDisconnect}
				>
					End
				</button>
			)}
		</div>
	);
}
