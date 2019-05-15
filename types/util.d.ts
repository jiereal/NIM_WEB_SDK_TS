import {MessageScene} from './message';
import {ErrorCallback} from './error';

export interface SendOption<T> {
	scene: MessageScene;
	to: string | number;
	done: ErrorCallback<T>;
}

/**
 * 特殊推送选项, 只在群会话中使用
 * @typedef ApnsItem
 * @property {[]} accounts 需要特殊推送的账号列表, 此字段不存在的话表示推送给当前会话内的所有用户
 * @property {string} content 需要特殊推送的文案
 * @property {boolean} forcePush 是否强制推送, true 表示即使推送列表中的用户屏蔽了当前会话（如静音）, 仍能够推送当前这条内容给相应用户
 */
export interface ApnsItem {
	accounts?: [];
	content?: string;
	forcePush?: boolean;
}

type JsonString = string;

declare enum FileType {
	Text = 1,
	Image,
	Video
}

export interface SendOptionExtends {
	custom?: JsonString; // 扩展字段, 推荐使用JSON格式构建, 非JSON格式的话, Web端会正常接收, 但是会被其它端丢弃
	pushContent?: string; // 自定义推送文案，限制500字
	pushPayload?: string; // 自定义的推送属性, 推荐使用JSON格式构建, 非JSON格式的话, Web端会正常接收, 但是会被其它端丢弃
	needPushNick?: boolean; // 是否需要推送昵称
	apns?: ApnsItem; // 特殊推送选项, 只在群会话中使用
	isHistoryable?: boolean; // 是否存储云端历史
	isRoamingable?: boolean; // 是否支持漫游
	isSyncable?: boolean; // 是否支持发送者多端同步
	cc?: boolean; // 是否支持抄送
	isPushable?: boolean; // 是否需要推送
	isOfflinable?: boolean; // 是否要存离线
	isUnreadable?: boolean; // 是否计入消息未读数
	needMsgReceipt?: boolean; // 是否需要业务已读（包含该字段即表示需要），只有设置了业务已读，才可以调用getTeamMsgReads,getTeamMsgReadAccounts等相关方法
	yidunEnable?: boolean; // 是否需要过易盾反垃圾
	antiSpamUsingYidun?: { type: FileType; data: string }; // 在开启yidunEnable后, 开发者自定义的反垃圾字段（json格式)，格式如下：{"type": 1, "data": "custom content"} 字段说明：type:1.文本，2.图片，3视频，data内容:文本内容or图片地址or视频地址
	antiSpamBusinessId?: string | number; // 用户配置的对某条单条消息另外反垃圾的业务ID
}
