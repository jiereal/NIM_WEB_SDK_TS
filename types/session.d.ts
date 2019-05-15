import {timeStamp} from './values';

export interface Session {
	id: string; // 会话ID
	scene: string; // 场景
	to: string; // 聊天对象, 账号或群ID
	updateTime: timeStamp; // 会话更新的时间
	unread: number; // 未读数
	lastMsg: any; // 此会话的最后一条消息
	msgReceiptTime?: timeStamp; // 消息已读回执时间戳, 如果有此字段, 说明此时间戳之前的所有消息对方均已读
	localCustom: string; // 本地自定义扩展字段
}
