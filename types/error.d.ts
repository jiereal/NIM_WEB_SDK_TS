export enum ErrorCode {
	Redirect = 302, // 账号或者密码错误, 请跳转到登录页面并提示错误
	RepeatLogin = 417, // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
	Kicked = 'kicked' // 被踢
}

export interface Error {
	message: string;
	code: ErrorCode; // 包含错误的信息
	event: object;
}

export interface ErrorCallback<T> {
	(err?: Error, msg?: T): void;
}
