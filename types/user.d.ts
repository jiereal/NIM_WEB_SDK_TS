import {timeStamp} from './values';

/**
 * 好友
 * @typedef Friend
 * @property {string} account
 * @property {string} alias 昵称
 * @property {string} custom 自定义字段
 * @property {timeStamp} createTime
 * @property {number} updateTime
 */
export interface Friend {
	account: string;
	alias: string;
	custom: string;
	createTime: timeStamp;
	updateTime: timeStamp;
}

export interface SyncfriendActionInfo {
	type: string;
	account?: string;
	friend?: Friend;
	ps?: string;
}

export interface User {
	account: string;
	nick: string;
	avatar: string;
	sign: string;
	gender: string;
	email: string;
	birth: string;
	tel: string;
	custom: string;
	createTime: timeStamp;
	updateTime: timeStamp;
}

export interface AddFriendOptions {
	account: string; // 要直接加为好友的账号
	ps?: string; // 附言, 选填, 开发者也可以使用JSON格式的字符串来扩展此内容
	done: (error?: Error, Obj?: any) => void; // 结果回调函数
}
