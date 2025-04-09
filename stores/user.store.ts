import { create } from "zustand";

export type User = {
	id: string;
	name: string;
	email: string;
	emailVerified: boolean;
	createdAt: Date;
	updatedAt: Date;
	image?: string | null | undefined | undefined;
	firstName: string;
	lastName: string;
};

type UserStore = {
	User: User | null;
	setUser: (user: User | null) => void;
	clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
	User: null,
	setUser: (user) => set({ User: user }),
	clearUser: () => set({ User: null }),
}));
