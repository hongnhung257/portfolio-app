import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import http from "@/config/axios.config";
import { IGenericResponse, IUser } from "@/types/common";
import authApiRequest from "@/apiRequest/auth";
import { ILoginResponse, ILogoutRes } from "@/app/(auth)/login/types/auth";

export type AuthenSchema = {
	username: string;
	password: string;
};

export const loginApi = async (payload: AuthenSchema) => {
	const res = await http.post<IGenericResponse<ILoginResponse>>(
		`/auth/v1/api-token-login-auth`,
		payload
	);
	return res.data;
};

export const useLogin = () => {
	const queryClient = useQueryClient();

	const loginMutation = useMutation({
		mutationFn: (userData: AuthenSchema) => loginApi(userData),
		onSuccess(data) {
			if (data.data.token) {
				queryClient.invalidateQueries({ queryKey: ["fetch-user"] });
			}
		},
	});

	return loginMutation;
};

/**
 * Fetch user by token
 */
export interface IFetchUserResponse extends IGenericResponse {
	data: IUser;
}

const fetchUserApi = async () => {
	const res = await http.get<IFetchUserResponse>(`auth/v1/user-profile`);
	return res.data;
};

export const useFetchUser = () => {
	return useQuery({
		queryKey: ["fetch-user"],
		queryFn: fetchUserApi,
		staleTime: Infinity,
		refetchInterval: 180000,
	});
};

/**
 * Logout
 */

export const logoutApi = async (): Promise<ILogoutRes> => {
	const res = await http.delete(`/auth/v1/logout`);
	return res.data;
};

export const useLogout = () => {
	const nav = useRouter();

	return useMutation({
		mutationKey: ["logout"],
		mutationFn: logoutApi,
		onSettled: (dataRes) => {
			if (dataRes) {
				authApiRequest.logout(dataRes).then(() => {
					nav.push("/login");
				});
			}
		},
	});
};
