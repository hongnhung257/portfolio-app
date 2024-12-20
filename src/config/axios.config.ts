/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import snakecaseKeys from "snakecase-keys";
import camelcaseKeys from "camelcase-keys";
import APP_ENV from "@/config/env.config";

const http = axios.create({
	baseURL: APP_ENV.NEXT_PUBLIC_BASE_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

class TokenUser {
	private token = "";

	get value() {
		return this.token;
	}

	set value(token: string) {
		this.token = token;
	}
}

export const tokenUser = new TokenUser();

http.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const newConfig = config;
		console.log("tokenUser.value", tokenUser.value);

		if (tokenUser.value) {
			newConfig.headers.Authorization = `Token ${tokenUser.value}`;
		}

		if (newConfig.data) {
			newConfig.data = JSON.stringify(snakecaseKeys(config.data));
		}

		return newConfig;
	},
	(error) => {
		// eslint-disable-next-line no-console
		console.log("HTTP-REQUEST-ERROR:", error);
		return Promise.reject(error);
	}
);

http.interceptors.response.use(
	(response: AxiosResponse) => {
		const newResponse = response;

		if (newResponse && newResponse.data) {
			let responseData = newResponse.data;
			responseData = camelcaseKeys(newResponse as any, {
				deep: true,
			});

			if (responseData?.data?.data.token) {
				localStorage.setItem("auth_token", responseData?.data?.data.token);
			}

			return responseData;
		}

		return newResponse.data;
	},
	(error) => {
		// eslint-disable-next-line no-console
		console.log("HTTP-RESPONSE-ERROR:", error);
	}
);

export default http;
