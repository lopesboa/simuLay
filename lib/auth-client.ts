import { toast } from "sonner";
import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	plugins: [nextCookies()],
	fetchOptions: {
		onError(e) {
			if (e.error.status === 429) {
				toast.error("Too many requests. Please try again later.");
			}
		},
	},
});

export const { signUp, signIn, signOut, useSession } = authClient;

authClient.$store.listen("$sessionSignal", async () => {});
