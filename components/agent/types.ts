import type { CALL_STATUS } from "./contants";

export type SavedMessage = {
	role: "user" | "assistant" | "system";
	content: string;
};

export type CallStatus = (typeof CALL_STATUS)[keyof typeof CALL_STATUS];
