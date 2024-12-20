/* eslint-disable @typescript-eslint/no-explicit-any */
type ICustomOptions = RequestInit & {
	baseUrl?: string;
};

class HttpError extends Error {
	status: number;
	payload: any;
	constructor({ status, payload }: { status: number; payload: any }) {
		super();
		this.status = status;
		this.payload = payload;
	}
}
const request = async <Response>(
	method: "GET" | "POST" | "PUT" | "DELETE",
	url: string,
	options?: ICustomOptions
) => {
	const body = options?.body ? JSON.stringify(options.body) : undefined;
	// const token = Cookies.get("sessionToken");
	// console.log(":rocket: ~ token:", token);
	const header = {
		"Content-Type": "application/json",
		// ...(token ? { Authorization: `Token ${token}` } : {}),
		...options?.headers,
	};

	const baseUrl = options?.baseUrl
		? options?.baseUrl
		: process.env.NEXT_PUBLIC_BASE_URL;

	const fullUrl = url.startsWith("/")
		? `${baseUrl}${url}`
		: `${baseUrl}/${url}`;

	const res = await fetch(fullUrl, {
		...options,
		headers: {
			...header,
		},
		body,
		method,
	});
	const payload: Response = await res.json();
	const data = {
		status: res.status,
		payload,
	};
	if (!res.ok) {
		throw new HttpError(data);
	}
	return data;
};
const http = {
	get<Response>(
		url: string,
		options?: Omit<ICustomOptions, "body"> | undefined
	) {
		return request<Response>("GET", url, options);
	},
	post<Response>(
		url: string,
		body: any,
		options?: Omit<ICustomOptions, "body"> | undefined
	) {
		return request<Response>("POST", url, { ...options, body });
	},
	delete<Response>(
		url: string,
		body: any,
		options?: Omit<ICustomOptions, "body"> | undefined
	) {
		return request<Response>("DELETE", url, { ...options, body });
	},
};
export default http;
