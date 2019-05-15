import * as File from './file';
import {DeviceType, timeStamp} from './values';
import {Error} from './error';
import {User} from './user';
import {Geolocation} from './geo';
import {ApnsItem, SendOption} from './util';

/**
 * 消息场景
 * @enum {string}
 * @property p2p 点对点消息
 * @property team 群消息
 */
export enum MessageScene {
	p2p = 'p2p',
	team = 'team'
}

/**
 * 消息类型
 * @typedef MessageType
 * @property text 文本消息
 * @property image 图片消息
 * @property audio 音频消息
 * @property video 视频消息
 * @property geo 地理位置消息
 * @property custom 自定义消息
 * @property tip 提醒消息
 * @property robot AI机器人消息
 * @property notification 群通知消息
 */
export enum MessageType {
	text = 'text',
	image = 'image',
	audio = 'audio',
	video = 'video',
	file = 'file',
	geo = 'geo',
	custom = 'custom',
	tip = 'tip',
	robot = 'robot',
	notification = 'notification'
}

/**
 * 消息实体
 * @typedef Message
 * @property {MessageScene} scene 消息场景
 * @property {string|number} from 消息发送方, 帐号或群id
 * @property {string} fromNick 消息发送方的昵称
 * @property {DeviceType} fromClientType 发送方的设备类型
 * @property {string | number} fromDeviceId 发送端设备id
 * @property {string | number} to 消息接收方, 帐号或群id
 * @property {Date} time 时间戳
 * @property {string|number} sessionId 消息所属的会话对象的ID
 * @property {string|number} target 聊天对象, 账号或者群id
 * @property {'in'|'out'} flow 消息的流向
 * @property {'sending'|'success'|'fail'} status 消息发送状态
 * @property {string} text 文本消息的文本内容
 * @property {File} file 参考：https://dev.yunxin.163.com/docs/product/IM%E5%8D%B3%E6%97%B6%E9%80%9A%E8%AE%AF/SDK%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/Web%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/%E6%B6%88%E6%81%AF%E6%94%B6%E5%8F%91
 * @property {Geolocation} geo 参考：https://dev.yunxin.163.com/docs/product/IM%E5%8D%B3%E6%97%B6%E9%80%9A%E8%AE%AF/SDK%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/Web%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/%E6%B6%88%E6%81%AF%E6%94%B6%E5%8F%91#%E5%9C%B0%E7%90%86%E4%BD%8D%E7%BD%AE%E5%AF%B9%E8%B1%A1
 * @property {string} [tip] 提醒消息的内容 参考：https://dev.yunxin.163.com/docs/product/IM%E5%8D%B3%E6%97%B6%E9%80%9A%E8%AE%AF/SDK%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/Web%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/%E6%B6%88%E6%81%AF%E6%94%B6%E5%8F%91#%E5%8F%91%E9%80%81%E6%8F%90%E9%86%92%E6%B6%88%E6%81%AF
 * @property {*} content 自定义消息或机器人回复消息的消息内容, 开发者可以自行扩展, 建议封装成JSON格式字符串 参考：https://dev.yunxin.163.com/docs/product/IM%E5%8D%B3%E6%97%B6%E9%80%9A%E8%AE%AF/SDK%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/Web%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/%E6%B6%88%E6%81%AF%E6%94%B6%E5%8F%91#%E5%8F%91%E9%80%81%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B6%88%E6%81%AF
 * @property {string} [attach] 群通知消息的附加信息
 * @property {string|number} idClient SDK生成的消息id, 在发送消息之后会返回给开发者, 开发者可以在发送消息的回调里面根据这个ID来判断相应消息的发送状态, 到底是发送成功了还是发送失败了, 然后根据此状态来更新页面的UI。如果发送失败, 那么可以重发消息
 * @property {string|number} idServer 服务器用于区分消息用的ID, 主要用于获取云端历史记录
 * @property {boolean} isMuted 该消息在接收方是否应该被静音
 * @property {boolean} isInBlackList 发送此条消息时，发送方'from'是否在接收方'to'的黑名单列表中
 * @property {boolean} resend 是否是重发的消息
 * @property {object} custom 扩展字段, 推荐使用JSON格式构建, 非JSON格式的话, Web端会正常接收, 但是会被其它端丢弃
 * @property {*} nosScene nos存储场景, 适用于发送文件消息, 默认初始化配置
 * @property {number} nosSurvivalTime nos存储场景有效时间, 适用于发送文件消息，默认初始化配置
 * @property {*} pushContent 自定义推送文案
 * @property {*} pushPayload 自定义的推送属性
 * @property {boolean} needPushNick 是否需要推送昵称
 * @property {ApnsItem[]} apns 特殊推送选项, 只在群会话中使用
 * @property {*} localCustom 本地自定义扩展字段
 * @property {boolean} isHistoryable 是否存储云端历史
 * @property {boolean} isRoamingable 是否支持漫游
 * @property {boolean} isSyncable 是否支持发送者多端同步
 * @property {boolean} cc 是否支持抄送
 * @property {boolean} isPushable 是否需要推送
 * @property {boolean} isOfflinable 是否要存离线
 * @property {boolean} isUnreadable 是否计入消息未读数
 * @property {boolean} isLocal 是否是本地消息, 请查阅发送本地消息；本地消息的发送请参考： https://dev.yunxin.163.com/docs/product/IM%E5%8D%B3%E6%97%B6%E9%80%9A%E8%AE%AF/SDK%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/Web%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/%E6%B6%88%E6%81%AF%E6%94%B6%E5%8F%91#%E5%8F%91%E9%80%81%E6%9C%AC%E5%9C%B0%E6%B6%88%E6%81%AF
 */
export interface Message {
	scene?: MessageScene;
	from?: string | number;
	fromNick?: string;
	fromClientType?: DeviceType;
	fromDeviceId?: string | number;
	to?: string | number;
	time?: timeStamp;
	type?: MessageType | SystemMessageType;
	sessionId?: string | number;
	target?: string | number;
	flow?: 'in' | 'out';
	status?: 'sending' | 'success' | 'fail';
	text?: string;
	file?: File.File | File.Image | File.Audio | File.Video;
	geo?: Geolocation;
	tip?: string;
	content?: any;
	attach?: Attach;
	idClient?: string | number;
	idServer?: string | number;
	isMuted?: boolean;
	isInBlackList?: boolean;
	resend?: boolean;
	custom?: any;
	nosScene?: any;
	nosSurvivalTime?: number;
	pushContent?: any;
	pushPayload?: any;
	needPushNick?: boolean;
	apns?: ApnsItem[];
	localCustom?: any;
	isHistoryable?: boolean;
	isRoamingable?: boolean;
	isSyncable?: boolean;
	cc?: boolean;
	isPushable?: boolean;
	isOfflinable?: boolean;
	isUnreadable?: boolean;
	isLocal?: boolean;
}

/**
 * @typedef TextMessage
 * @property {string} text 消息文本
 */
export interface TextMessage extends Message {
	text: string;
}

/**
 * 机器人消息对象
 * @typedef RobotMessage
 * @extends Message
 * @property {string|number} robotAccid 机器人帐号id, 如果是直接p2p与机器人聊天，此项可不填，to字段即为robotAccid
 * @property {string} body 用于记录原始文本数据，在UI中展现，如"@机器人 你好"，实际发给机器人的字段则是"你好"二字
 * @property {object} content 机器人消息体，为javascript对象
 * @property {object} content.type 机器人消息类型
 * @property {string} content.type.welcome 欢迎消息
 * @property {string} content.type.text 文本消息，需要配合参数content
 * @property {string} content.type.link bot链接消息，需要配合参数params、target
 * @property {string} content.content 机器人文本消息内容
 * @property {*} content.params 机器人链接消息参数
 * @property {*} content.target 机器人链接消息目标
 * @property {'bot'|'faq'} content.flag (回复的机器人消息)，标记机器人消息类型，有bot模板消息、faq问答消息
 */
export interface RobotMessage extends Message {
	robotAccid: string | number;
	body: string;
	content: RobotMessageContent;
}

export interface RobotMessageContent {
	type?: {
		welcome?: string;
		text?: string;
		link?: string;
	};
	content?: any;
	params?: any;
	target?: any;
	flag: 'bot' | 'faq';
}

/**
 * @enum SystemMessageType
 * @property teamInvite 入群邀请
 * @property rejectTeamInvite 拒绝入群邀请
 * @property applyTeam 入群申请
 * @property rejectTeamApply 拒绝入群申请
 * @property addFriend 直接加某个用户为好友后, 对方不需要确认, 直接成为当前登录用户的好友, 对方会收到一条类型为'addFriend'的系统通知, 此类系统通知的from字段的值为申请方的帐号, to字段的值为接收方的账号。
 * @property applyFriend 申请加某个用户为好友后, 对方会收到一条类型为'applyFriend'的系统通知, 此类系统通知的from字段的值为申请方的帐号, to字段的值为接收方的账号, 用户在收到好友申请后, 可以选择通过或者拒绝好友申请。
 * 如果通过好友申请, 那么申请方会收到一条类型为'passFriendApply'的系统通知, 此类系统通知的from字段的值为通过方的帐号, to字段的值为申请方的账号。
 * 如果拒绝好友申请, 那么申请方会收到一条类型为'rejectFriendApply'的系统通知, 此类系统通知的from字段的值为拒绝方的帐号, to字段的值为申请方的账号。
 * @property passFriendApply
 * @property rejectFriendApply
 * @property deleteFriend 删除好友后, 被删除的人会收到一条类型为'deleteFriend'的系统通知, 此类系统通知的from字段的值为删除方的帐号, to字段的值为被删除方的账号。
 * @property deleteMsg 撤回消息后, 消息接收方会收到一条类型为'deleteMsg'的系统通知, 此类系统通知的 msg 为被删除的消息的部分字段。如果是群消息, 那么群里的所有人都会收到这条系统通知. 如果同时在多个端登录了同一个账号, 那么其它端也会收到这条系统通知.
 * @property custom
 */
export enum SystemMessageType {
	teamInvite = 'teamInvite',
	rejectTeamInvite = 'rejectTeamInvite',
	applyTeam = 'applyTeam',
	rejectTeamApply = 'rejectTeamApply',
	addFriend = 'addFriend',
	applyFriend = 'applyFriend',
	passFriendApply = 'passFriendApply',
	rejectFriendApply = 'rejectFriendApply',
	deleteFriend = 'deleteFriend',
	deleteMsg = 'deleteMsg',
	custom = 'custom'
}

export interface SystemMessage extends Message {
	idServer?: string; // 内建系统通知的 idServer
	read?: boolean; // 内建系统通知是否已读
	category?: string; // 内建系统通知的种类
	state?: string; // 内建系统通知的state
	error?: Error; // 内建系统通知的state 为 'error' 时, 此字段包含错误的信息
	localCustom?: string; // 内建系统通知的本地自定义扩展字段
	ps?: string; // 内建系统通知的附言
	attach?: Attach; // 内建系统通知的附加信息, 参考系统通知类型来查看不同类型的系统通知对应的附加信息
	scene?: MessageScene; // 自定义系系统通知的场景, 参考消息场景
	content?: string; // 自定义系统通知的内容
	isPushable: boolean; // 是否需要推送
	apnsText?: string; // 自定义系统通知的推送文案, 仅对接收方为iOS设备有效
	pushPayload?: string; // 自定义系统通知的推送属性
	needPushNick: boolean; // 是否需要推送昵称
	/**
	 * 自定义系统通知是否只发送给在线用户
	 * true时只发送给在线用户, 适合发送即时通知, 比如正在输入。
	 * false时假如目标用户或群不在线, 会在其上线后推送过去。
	 * 该参数只对点对点自定义系统通知有效, 对群自定义系统通知无效, 群自定义系统通知只会发给在线的群成员, 不会存离线。
	 */
	sendToOnlineUsersOnly?: boolean;
	cc: boolean; // 自定义系统通知是否抄送
}

export enum AttachType {
	updateTeam = 'updateTeam', // 更新群
	addTeamMembers = 'addTeamMembers', // 拉人入群
	removeTeamMembers = 'removeTeamMembers', // 踢人出群
	acceptTeamInvite = 'acceptTeamInvite', // 接受入群邀请
	passTeamApply = 'passTeamApply', // 通过入群申请
	addTeamManagers = 'addTeamManagers', // 添加群管理员
	removeTeamManagers = 'removeTeamManagers', // 移除群管理员
	leaveTeam = 'leaveTeam', //  主动退群
	dismissTeam = 'dismissTeam', // 解散群
	transferTeam = 'transferTeam', // 转让群
	updateTeamMute = 'updateTeamMute' // 更新群成员禁言状态
}

/**
 * 群通知消息的attach字段
 */
export interface Attach {
	type: AttachType;
}

/**
 * 群通知信息
 * @typedef NotificationMessage
 * @link https://dev.yunxin.163.com/docs/product/IM%E5%8D%B3%E6%97%B6%E9%80%9A%E8%AE%AF/SDK%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/Web%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/%E6%B6%88%E6%81%AF%E6%94%B6%E5%8F%91?#%E7%BE%A4%E9%80%9A%E7%9F%A5%E6%B6%88%E6%81%AF
 */
export interface NotificationMessage {
	attach: Attach;
	account?: string | number;
	accounts?: any;
	users?: User[];
}

/**
 * 未读消息
 */
export interface Unread {
	total: number; // 总共的未读数
	friend: number; // 所有跟好友相关的系统通知的未读数
	addFriend: number; // 直接加为好友的未读数
	applyFriend: number; // 申请加为好友的未读数
	passFriendApply: number; //  通过好友申请的未读数
	rejectFriendApply: number; // 拒绝好友申请的未读数
	deleteFriend: number; // 删除好友的未读数
	team: number; // 所有跟群相关的系统通知的未读数
	teamInvite: number; // 入群邀请的未读数
	rejectTeamInvite: number; // 接受入群邀请的未读数
	applyTeam: number; // 入群申请的未读数
	rejectTeamApply: number; // 拒绝入群申请的未读数
}

/**
 * 发送文本信息入参
 */
export interface TextMessageOption extends SendOption<Message> {
	text: string;
}

export interface TipMessageOption extends SendOption<Message> {
	tip: string;
}

export interface CustomMessageOption extends SendOption<Message> {
	content: string;
}

export interface RobotMessageOption extends SendOption<RobotMessage> {
	robotAccid: string;
	content: RobotMessageContent;
}
