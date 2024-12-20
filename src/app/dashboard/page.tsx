"use client";

import { useLogout } from "@/app/(auth)/login/api/login.api";
import { CButton } from "@/components/ui/button";
import { tokenUser } from "@/config/axios.config";

const Dashboard = () => {
	// const { data: dataUser } = useFetchUser();
	console.log(tokenUser.value);
	const logout = useLogout();
	const handleLogout = () => {
		logout.mutate();
	};
	return (
		<div>
			<CButton onClick={handleLogout}>Log out</CButton>
		</div>
	);
};

export default Dashboard;
