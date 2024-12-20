import { AuthenSchema } from "@/app/(auth)/login/api/login.api";
import { ILoginResponse, ILogoutRes } from "@/app/(auth)/login/types/auth";
import http from "@/config/http";
import { IGenericResponse } from "@/types/common";

const authApiRequest = {
	loginApi: (payload: AuthenSchema) =>
		http.post<IGenericResponse<ILoginResponse>>(
			"/auth/v1/api-token-login-auth",
			payload
		),

	setToken: (payload: IGenericResponse<ILoginResponse>) =>
		http.post<IGenericResponse<ILoginResponse>>("api/auth/login", payload, {
			baseUrl: "http://localhost:3000",
		}),

	logout: (payload: ILogoutRes) =>
		http.post<IGenericResponse<ILogoutRes>>("api/auth/logout", payload, {
			baseUrl: "http://localhost:3000",
		}),
};

export default authApiRequest;
