import React from "react";

import { cn } from "@/lib/utils";
import type { SavedMessage } from "./types";

type TranscriptMessageProps = {
	messages: SavedMessage[];
	latestMessage: string;
};

export function TranscriptMessage({
	messages,
	latestMessage,
}: TranscriptMessageProps) {
	return messages?.length > 0 ? (
		<div className="transcript-border">
			<div className="transcript">
				<p
					key={latestMessage}
					className={cn(
						"transiton-opacity duration-500 opacity-0",
						"animate-fadeIn opacity-100",
					)}
				>
					{latestMessage}
				</p>
			</div>
		</div>
	) : null;
}
