/**
 * @module Team
 * @link https://dev.yunxin.163.com/docs/product/IM%E5%8D%B3%E6%97%B6%E9%80%9A%E8%AE%AF/SDK%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/Web%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/%E7%BE%A4%E7%BB%84%E5%8A%9F%E8%83%BD
 */
import {timeStamp} from './values';
import {Message} from './message';
import {ErrorCallback} from "@/nimSdk/types/error";
import {JsonString} from "@/nimSdk/types/util";

export enum TeamType {
	normal = 'normal',
	advanced = 'advanced'
}

export enum JoinMode {
	noVerify = 'noVerify', // 不需要验证
	needVerify = 'needVerify', // 需要验证
	rejectAll = 'rejectAll', // 禁止任何人加入
}

export enum InviteMode {
	manager = 'manager', // 只有管理员/群主可以邀请他人入群
	all = 'all', // 所有人可以邀请他人入群
}

export enum BeInviteMode {
	needVerify = 'needVerify', // (需要邀请方同意)
	noVerify = 'noVerify', // 不需要邀请方同意
}

export enum UpdateTeamMode {
	manager = 'manager', // 只有管理员/群主可以修改
	all = 'all', // 所有人可以修改
}

export interface Team {
	teamId: string; // 群Id
	type: TeamType; // 群类型
	name: string; // 群名字
	avatar: string; // 群头像
	intro: string; // 群简介
	announcement: string; // 群公告
	joinMode: JoinMode; // 群加入方式, 仅限高级群
	beInviteMode: BeInviteMode; // 群被邀请模式, 仅限高级群
	inviteMode: InviteMode; // 群邀请模式, 仅限高级群
	updateTeamMode: UpdateTeamMode; // 群信息修改权限, 仅限高级群
	updateCustomMode: string; // 群信息自定义字段修改权限, 仅限高级群
	owner: string; // 群主
	level: number; // 群人数上限
	memberNum: number; // 群成员数量
	memberUpdateTime: number; // 群成员最后更新时间
	createTime: timeStamp; // 群创建时间
	updateTime: timeStamp; // 群最后更新时间
	custom: string; // 第三方扩展字段, 开发者可以自行扩展, 建议封装成JSON格式字符串
	serverCustom: string; // 第三方服务器扩展字段, 开发者可以自行扩展, 建议封装成JSON格式字符串
	valid: boolean; // 是否有效, 解散后该群无效
	validToCurrentUser: boolean; // 该群是否对当前用户有效, 如果无效, 那么说明被踢了
	mute: boolean; // 是否禁言, 禁言状态下普通成员不能发送消息, 创建者和管理员可以发送消息
}

export enum TeamMemberType {
	normal = 'normal', // 普通成员
	owner = 'owner', // 群主
	manager = 'manager', // 管理员
}

export interface TeamMember {
	teamId: number | string; // 群ID
	account: string; // 帐号
	type: TeamMemberType; // 群成员类型
	nickInTeam: string; // 在群里面的昵称
	muteTeam: boolean; // 是否关闭此群的消息提醒, true表示关闭提醒, 但是SDK仍然会收到这个群的消息, SDK只是记录这个设置, 具体根据这个设置要执行的操作由第三方APP决定
	joinTime: number; // 入群时间
	updateTime: number; // 更新时间
	active: boolean; // 普通群拉人进来的时候, 被拉的人处于未激活状态, 未激活状态下看不到这个群, 当有人说话后自动转为激活状态, 能看到该群
	mute: boolean; // 是否被禁言
	custom: string; // 第三方扩展字段
}

export interface AcceptTeamInviteOptions {
	idServer: string; // 对应的系统通知的 idServer
	teamId: string; // 群id
	from: string; // 邀请方的帐号
	done: (error?: Error, team?: Team) => void; // 结果回调函数, 成功时会收到群资料
}

/**
 * 添加管理员
 */
export interface AddTeamManagersOptions {
	teamId: string; // 群id
	accounts?: string[]; // 要添加的管理员帐号列表
	done: (error?: Error, Obj?: Message) => void; // 结果回调函数
}

/**
 * 创建群
 */
export interface CreateTeamOption {
	type: TeamType;
	name: string;
	avatar: string;
	accounts: string[];
	level: number; // 群人数上限，选填，默认为该app当前整体配置的群人数上限。指定的群人数上限不可超过当前app配置的群人数上限，否则创建失败，返回相关的错误码。
	ps?: string; // 附言, 选填, 开发者也可以使用JSON格式的字符串来扩展此内容
	done: ErrorCallback<Team>;
}

/**
 * 更新群，普通群无法更新
 */
export interface UpdateTeamOption {
	teamId: number | string;
	name: string;
	avatar: string;
	intro: string;
	announcement: string;
	joinMode: JoinMode;
	custom?: string;
	done?: ErrorCallback<Team>;
}

export interface AddTeamOption {
	teamId: number | string;
	accounts: string[];
	ps?: string;
	custom?: string;
	done?: ErrorCallback<Team>;
}

export interface RemoveTeamMembersOption {
	teamId: number | string;
	accounts: string[];
	done: ErrorCallback<any>;
}

export interface RejectTeamInviteOption {
	idServer: string;
	teamId: number | string;
	from: string;
	ps?: string;
	done: ErrorCallback<any>;
}

/**
 * 申请入群
 */
export interface ApplyTeamOption {
	teamId: number | string;
	ps?: string;
	done: ErrorCallback<any>;
}

/**
 * 通过入群申请
 */
export interface PassTeamApplyOption {
	idServer: string;
	teamId: number | string;
	from: string;
	done: ErrorCallback<any>;
}

/**
 * 拒绝入群申请
 */
export interface RejectTeamApplyOption {
	idServer: string;
	teamId: number | string;
	from: string;
	ps?: string;
	done: ErrorCallback<any>;
}

/**
 * 转让群
 */
export interface TransferTeamOption {
	teamId: number | string;
	account: string;
	leave: boolean;
	done: ErrorCallback<any>;
}

/**
 * 修改自己的群属性
 */
export interface UpdateInfoTeamOption {
	nickInTeam?: string; // 自己在群里面的群昵称 更新昵称后, 所有其它在线的群成员会收到初始化SDK时传入的onupdateteammember回调
	muteTeam?: boolean; // 是否关闭此群的消息提醒, true表示关闭提醒, 但是SDK仍然会收到这个群的消息, SDK只是记录这个设置, 具体根据这个设置要执行的操作由第三方APP决定, 设置之后可以调用接口是否需要群消息通知来查询是否需要群消息通知
	muteNotiType?: 0 | 1; // 0表示接收提醒，1表示关闭提醒，2表示仅接收管理员提醒
	custom?: JsonString;
}

/**
 * 修改别人的群昵称
 */
export interface UpdateNickInTeam {
	teamId: number | string;
	account: string;
	nickInTeam?: string;
	done: ErrorCallback<any>;
}

/**
 * 更新群成员禁言状态
 */
export interface UpdateMuteStateInTeamOption {
	teamId: number | string;
	account: string;
	mute: boolean;
	done: ErrorCallback<any>;
}

/**
 * 群整体禁言只有群主有权限
 */
export interface MuteTeamAllOption {
	teamId: number | string;
	type: 'none' | 'normal' | 'all';
	done: ErrorCallback<any>;
}
