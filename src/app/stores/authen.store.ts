import { create } from "zustand";

type AuthenStore = {
	isAuthen: boolean;
	actions: {
		setIsAuthen: (value: boolean) => void;
	};
};

const useAuthenStore = create<AuthenStore>((set) => ({
	isAuthen: false,

	actions: {
		setIsAuthen: (isAuthen) => set(() => ({ isAuthen })),
	},
}));

export const useAuthenActions = () => useAuthenStore((state) => state.actions);

export const useIsAuthen = () => useAuthenStore((state) => state.isAuthen);
