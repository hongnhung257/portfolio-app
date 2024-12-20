import { AppQueryContextProvider } from "@/provider/app-context-provider";
import AppQueryClientProvider from "@/provider/app-query-provider";
import { cookies } from "next/headers";
import { ReactNode } from "react";

function AppProvider({ children }: { children: ReactNode }) {
	const cookiesStore = cookies();

	const tokenStore = cookiesStore.get("token")?.value;

	return (
		<AppQueryClientProvider>
			<AppQueryContextProvider initialToken={tokenStore || ""}>
				{children}
			</AppQueryContextProvider>
		</AppQueryClientProvider>
	);
}

export default AppProvider;
