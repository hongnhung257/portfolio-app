/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IGenericResponse<T = any> {
	map(arg0: (item: any) => string): unknown;
	status: number;
	isFlag: boolean;
	msg: string;
	data: T;
}

export interface IUser {
	email: string;
	firstName: string;
	id: number;
	isActive: boolean;
	isInternalUser: boolean;
	isLapUser: boolean;
	language: Language;
	lastName: string;
	username: string;
	isNewUser: boolean;
	isOpenTutorial: boolean;
	permissionRoles: IPermissionRoles;
	firebaseToken: string;
}
