export interface ILoginResponse {
	nonFieldErrors: string[];
	token: string;
	email: string;
	userId: number;
	isNewUser: boolean;
}

interface ILogoutRes extends IGenericResponse {
	data: {
		isAuthenticated: boolean;
	};
}
