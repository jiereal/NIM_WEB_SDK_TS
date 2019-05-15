import {DeviceType} from './values';
import * as Event from './event';
import {
	AcceptTeamInviteOptions,
	AddTeamManagersOptions,
	AddTeamOption,
	ApplyTeamOption,
	CreateTeamOption,
	MuteTeamAllOption,
	PassTeamApplyOption,
	RejectTeamApplyOption,
	RejectTeamInviteOption,
	RemoveTeamMembersOption,
	Team,
	TeamMember,
	TransferTeamOption,
	UpdateInfoTeamOption,
	UpdateMuteStateInTeamOption,
	UpdateNickInTeam,
	UpdateTeamOption
} from './team';
import {AddFriendOptions, Friend, SyncfriendActionInfo, User} from './user';
import {
	CustomMessageOption,
	Message, MessageScene,
	RobotMessageOption,
	SystemMessage,
	TextMessageOption,
	TipMessageOption,
	Unread
} from './message';
import {Relation} from './relation';
import {Session} from './session';
import {SyncMarkInBlacklistInfo, SyncMarkInMutelistInfo} from './sync';
import {FileOption} from './file';
import {SendGeoOption} from './geo';
import {JsonString, SendOption} from './util';
import {ErrorCallback} from "@/nimSdk/types/error";

declare global {
	interface Window {
		SDK: {
			NIM: NimSdk.NIM;
		};
	}
}
type MessageOperateOption = { msg: Message | Message[] } & SendOption<Message>;

declare namespace NimSdk {

	export class NIM {
		/**
		 * 此接口为单例模式, 对于同一个账号, 永远返回同一份实例, 即只有第一次调用会初始化一个实例
		 * 后续调用此接口会直接返回初始化过的实例, 同时也会调用接口setOptions更新传入的配置
		 * 后续调用此接口时, 如果连接已断开, 会自动建立连接
		 * 当发生掉线时，SDK会自动进行重连
		 * @param options
		 */
		public static getInstance(options: NIMOptions): NIM;

		public parser: any;
		public fn: any;
		public info: any;
		public platform: any;
		public io: any;
		public util: any;
		public support: any;
		public blob: any;

		public Protocol(): any;

		public use(): any;

		public getInstance(): any;

		public rmAllInstances(): any;

		public genInstanceName(): any;

		public xhr(): any;

		public naturalSort(): any;

		public deepAccess(): any;

		public ajax(): any;

		public LoggerPlugin(): any;

		public usePlugin(): any;
	}

	export class Util {
		/**
		 * 从数组里面去除某些项
		 * @param olds
		 * @param invalids
		 * @param options
		 */
		public static cutObjArray(
			olds: object[],
			invalids: object[],
			options: object
		): object[];

		/**
		 * 在数组里面找 keyPath 对应的属性值为 value 的元素
		 * @param array
		 * @param options
		 */
		public static findObjInArray(array: object[], options: object): object;

		/**
		 * 生成一个 32 位的 GUID/UUID
		 */
		public static guid(): string;

		/**
		 * 合并数组
		 * @param arr1
		 * @param arr2
		 * @param options
		 */
		public static mergeObjArray(
			arr1: object[],
			arr2: object[],
			options: object
		): object[];

		/**
		 * 返回排序后的数组
		 * @param array
		 * @param options
		 */
		public static sortObjArray(array: object[], options: object): object[];
	}
}

export default NimSdk;
export as namespace NimSdk;

export {
	Message,
	MessageScene,
	MessageType,
	RobotMessage,
	TextMessage
} from './message';

/**
 * 同步配置
 * @typedef SyncOptions
 * @property {boolean} [syncRelations=true] 同步用户关系
 * @property {boolean} [syncFriends=true] 同步好友对应的用户名片列表
 * @property {boolean} [syncFriendUsers=true] 同步好友对应的用户名片列表
 * @property {boolean} [syncRoamingMsgs=true] 是否同步漫游消息
 * @property {boolean} [syncMsgReceipts=true] 是否同步已读回执时间戳
 * @property {boolean} [syncTeams=true] 同步群
 * @property {boolean} [syncExtraTeamInfo=true] 是否同步额外的群信息
 * @property {boolean} [syncRobots=false] 是否同步机器人列表
 * @property {boolean} [syncTeamMembers=true] @Deprecated
 * @property {boolean} [syncBroadcastMsgs=false] 是否同步广播消息
 * @property {boolean} [syncSessionUnread=false] 是否同步会话未读数(开启数据库时有效，保证多端未读数相一致)
 */
export interface SyncOptions {
	syncSessionUnread?: boolean;
	syncBroadcastMsgs?: boolean;
	syncRobots?: boolean;
	syncRelations?: boolean;
	syncFriends?: boolean; //  同步好友关系
	syncFriendUsers?: boolean; //  同步好友对应的用户名片列表
	syncRoamingMsgs?: boolean; //
	syncMsgReceipts?: boolean; //
	syncTeams?: boolean; //
	syncExtraTeamInfo?: boolean; //   同步额外群资料
}

/**
 * 扩展参数
 * @typedef ExtendNIMOptions
 * @property {boolean} [db] 是否开启本地数据库存储数据
 * @property {string} [no sScene=im] nos存储场景
 * @property {number} [nosSurvivalTime=Infinity] nos存储场景有效时间
 * @property {string} [uploadUrl] 私有化部署方案对文件处理专用接口 参考：https://dev.yunxin.163.com/docs/product/IM%E5%8D%B3%E6%97%B6%E9%80%9A%E8%AE%AF/SDK%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/Web%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/%E5%B7%A5%E5%85%B7%E6%96%B9%E6%B3%95#%E9%A2%84%E8%A7%88%E5%9B%BE%E7%89%87%E9%80%9A%E7%94%A8%E6%96%B9%E6%B3%95
 * @property {string} [downloadUrl] 私有化部署方案对文件处理专用接口 参考：https://dev.yunxin.163.com/docs/product/IM%E5%8D%B3%E6%97%B6%E9%80%9A%E8%AE%AF/SDK%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/Web%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/%E5%B7%A5%E5%85%B7%E6%96%B9%E6%B3%95#%E9%A2%84%E8%A7%88%E5%9B%BE%E7%89%87%E9%80%9A%E7%94%A8%E6%96%B9%E6%B3%95
 * @property {boolean} [enabledHttpsForMessage] 针对 iOS 对 https 链接的要求而设计，若设置为 true，则所有文件类型消息的链接转为 https，现在所有使用云信 sdk 进行上传的文件链接均为 https。开发者一般不需要关注此项
 * @property {boolean} [needReconnect] 连接失败时是否需要自动重连
 * @property {boolean} [autoMarkRead] 对收到的消息，是否自动标记为已读
 * @property {function} [shouldIgnoreNotification] 该参数类型为函数(function)，表示是否要忽略某条通知类消息。该方法会将接收到的通知类消息对象，按照用户上层定义的逻辑进行过滤, 如果该方法返回 true，那么 SDK 将忽略此条通知类消息
 * @property {function} [shouldCountNotifyUnread] 该参数类型为函数(function)，群消息通知是否加入未读数开关，有上层对回调参数对象做分析，如果返回 true，则计入未读数，否则不计入
 * @property {string|null} [ntServerAddress] 连接统计上报地址，设为null则不上报，用户可填写自己的日志上报地址，不填则默认为云信服务器的统计地址
 */
export interface ExtendNIMOptions {
	db?: boolean;
	nosScene?: string;
	nosSurvivalTime?: number;
	uploadUrl?: string;
	downloadUrl?: string;
	enabledHttpsForMessage?: boolean;
	needReconnect?: boolean;
	ntServerAddress?: string | null;

	shouldIgnoreNotification?(): boolean;

	shouldCountNotifyUnread?(): boolean;
}

/**
 * 多端登录 onloginportschange回调传入参数
 * @typedef LoginPort
 * @property {DeviceType} [type] 登录的设备类型
 * @property {string} [os] 登录设备的操作系统
 * @property {string} [mac] 登录设备的 mac 地址
 * @property {string|number} [deviceId] 登录设备ID, uuid
 * @property {string|number} [account] 登录的帐号
 * @property {string|number} [connectionId] 登录设备分配的连接号
 * @property {string} [ip] 登录的服务器 IP
 * @property {date} [time] 登录时间
 * @property {boolean} [online] 是否在线
 */
export interface LoginPort {
	type?: DeviceType;
	os?: string;
	mac?: string;
	deviceId?: string | number;
	account?: string | number;
	connectionId?: string | number;
	ip?: string;
	time?: Date | string;
	online?: boolean;
}

export interface NIMOptions extends SyncOptions {
	debug?: boolean; // 是否开启日志, 开发者可以开启日志, 这样 SDK 会将关键操作的信息打印到控制台上, 便于调试
	appKey: string;
	account: string;
	token: string;
	nosSurvivalTime?: any;
	Protocol?: any;
	Message?: any;
	logger?: Logger;
	secure?: boolean;
	exifOrientation?: boolean;
	customTag?: string; // 客户端自定义tag，最大32个字符
	/**
	 * 用于建立长连接的协议数组，可不填，默认为['websocket', 'xhr-polling']
	 * 默认状态 sdk 优先使用 websocket 连接，如果浏览器不支持 websocket，则使用 xhr-polling
	 * 开发者可手动设置连接及顺序，可支持选项包括 websocket、xhr-polling、flashsocket
	 * 示例如： transports: ['websocket'、'xhr-polling'、'flashsocket']
	 */
	transports?: string[];
	keepNosSafeUrl?: boolean; // 表示是否保持NOS文件安全短链不变，默认为false，自动将短链替换为源链。设置为true则保持不变，用户可通过NOS文件短链换源链。
	rollbackDelMsgUnread?: boolean; //  表示收到撤回消息是否同时撤销被撤回消息影响的未读数，默认为false。决定是否会将被撤回的消息计入未读计算。如置为true，则在被撤回消息未读场景下，撤回时未读消息数减一。
	privateConf?: any; // 私有化部署所需的配置，可通过管理后台配置并下载相应的js文件，将相应内容引入配置

	logFunc?(): any; // 日志分析函数
	onconnect?(arg?: Event.ConnectEvent): void;

	onerror?(error?: Error): void;

	onwillreconnect?(arg?: Event.ReconnectEvent): void;

	ondisconnect?(arg?: any): void;

	onloginportschange?(arg?: LoginPort): void;

	onmyinfo?(user: User): void; // 我的名片

	onblacklist?(): void; // 黑名单

	onmutelist?(mutelist: any): void; // 静音列表

	onfriends?(arg: Friend[]): void; // 好友

	onusers?(users: User[]): void; // 好友的名片

	onrobots?(): void;

	onteams?(teams: Team[]): void; // 群

	/**
	 * 同步最近会话列表回调, 会传入会话列表, 按时间正序排列, 即最近聊过天的放在列表的最后面。
	 * @param sessions
	 */
	onsessions?(sessions: Session[]): void; // 会话

	onroamingmsgs?(message: Message): void; // 同步漫游消息对象的回调, 每个会话对象对应一个回调, 会传入消息数组

	onofflinemsgs?(): void; // 同步离线消息对象的回调, 每个会话对象对应一个回调, 会传入消息数组

	onofflinefiltermsgs?(): void; //

	onroamingsysmsgs?(systemMessage: SystemMessage[]): void; // 漫游消息

	/**
	 * 同步离线系统通知的回调, 会传入系统通知数组
	 * 在支持数据库时并且启用了多 tab 同时登录, 那么如果多个 tab 页同时断线重连之后, 只会有一个 tab 页负责存储离线系统通知,
	 * 即只会有一个 tab 页会收到 onofflinesysmsgs回调, 其它 tab 页在同步完成之后, 需要调用获取本地系统通知来从本地缓存中拉取系统通知
	 * @param systemMessage
	 */
	onofflinesysmsgs?(systemMessage: SystemMessage[]): void; //

	onofflinefiltersysmsgs?(): void;

	onofflinecustomsysmsgs?(systemMessage: SystemMessage[]): void; // 离线自定义系统通知

	onofflinefiltercustomsysmsgs?(): void;

	onbroadcastmsg?(): void;

	onbroadcastmsgs?(): void;

	/**
	 * 收到系统通知未读数的回调
	 * @param unread
	 */
	onsysmsgunread?(unread: Unread): void;

	onsyncdone?(): void;

	onteammembers?(teams: Team[]): void;

	onsyncteammembersdone?(): void;

	onmsg?(message: Message): void; // 收到消息对象的回调

	/**
	 * 收到系统通知的回调, 会传入系统通知
	 * 收到系统通知后需要调用标记系统通知为已读状态来将系统通知标记为已读状态
	 * @param systemMessage
	 */
	onsysmsg?(systemMessage: SystemMessage): void;

	oncustomsysmsg?(systemMessage: SystemMessage): void;

	onupdatemyinfo?(): void;

	onupdateuser?(user: User): void;

	onupdateteammember?(teamMember: TeamMember): void;

	onCreateTeam?(team: Team): void;

	onUpdateTeam?(team: Team): void;

	onAddTeamMembers?(obj: any): void;

	onRemoveTeamMembers?(obj: any): void;

	onUpdateTeamManagers?(obj: any): void;

	/**
	 * 解散群的回调, 此方法接收一个参数, 包含被解散的群id
	 * @param arg
	 */
	onDismissTeam?(arg: any): void;

	/**
	 * 移交群的回调, 此方法接收一个参数, 包含群信息和新老群主信息
	 * @param arg
	 */
	onTransferTeam?(arg: any): void;

	/**
	 * 更新群成员禁言状态的回调, 此方法接收一个参数, 包含群信息和禁言状态信息
	 * @param arg
	 */
	onUpdateTeamMembersMute?(arg: any): void;

	onTeamMsgReceipt?(): void;

	onupdatesession?(sessions: Session[]): void;

	onupdatesysmsgunread?(unread: Unread): void;

	/**
	 * 更新系统通知后的回调, 会传入{@link SystemMessage|系统通知}
	 * 以下情况会收到此回调
	 * 通过好友申请
	 * 拒绝好友申请
	 * 接受入群邀请
	 * 拒绝入群邀请
	 * 通过入群申请
	 * 拒绝入群申请
	 * 这些操作的发起方会收到此回调, 接收被更新的系统通知, 根据操作的类型系统通知会被更新为下面两种状态
	 * 'passed': 已通过
	 * 'rejected': 已拒绝
	 * @param systemMessage
	 */
	onupdatesysmsg?(systemMessage: SystemMessage): void;

	onsynccreateteam?(team: Team): void;

	onsyncmarkinblacklist?(syncMarkInBlacklistInfo?: SyncMarkInBlacklistInfo): void;

	onsyncmarkinmutelist?(syncMarkInMutelistInfo: SyncMarkInMutelistInfo): void;

	/**
	 * 当前登录用户在其它端进行好友相关的操作后的回调, 操作包括:
	 * 直接加为好友
	 * 申请加为好友
	 * 通过好友申请
	 * 拒绝好友申请
	 * 删除好友
	 * 更新好友
	 * @param syncfriendActionInfo
	 */
	onsyncfriendaction?(syncfriendActionInfo: SyncfriendActionInfo): void;

	shouldIgnoreNotification?(): void; // 该参数类型为函数(function)，表示是否要忽略某条通知类消息。该方法会将接收到的通知类消息对象，按照用户上层定义的逻辑进行过滤, 如果该方法返回 true，那么 SDK 将忽略此条通知类消息

	shouldCountNotifyUnread?(): void;

	onPushNotificationMultiportConfig?(): void;

	onPushNotificationMultiportConfigUpdate?(): void;

	onpushevents?(): void;
}

export interface Logger {
	[key: string]: any;
}

export interface DB {
	[key: string]: any;
}

export abstract class NimEvent extends Event.Event {
	public info: any;

	public updatePrivateConf(): any;

	public init(): any;

	public destroy(): any;

	public reset(): any;

	/**
	 * 更新配置, 参数格式跟 NIM.getInstance 保持一致
	 * @param options
	 */
	public setOptions(options: any): void;

	public processCallback(): any;

	public processCallbackPromise(): any;

	public processPs(): any;

	public processCustom(): any;

	public sendCmd(): any;

	public sendCmdWithResp(): any;

	public cbAndSendCmd(): any;

	public sendCmdUsePromise(): any;

	public logout(): any;

	public isConnected(): any;

	/**
	 * 登录 SDK
	 */
	public connect(): void;

	/**
	 * 登出 SDK
	 */
	public disconnect(): void;

	/**
	 * 发送文本消息
	 * @param options
	 * @param apns
	 */
	public sendText(options: TextMessageOption, apns?: any): Message;

	/**
	 * 预览文件
	 * @param options
	 */
	public previewFile(options: any): void;

	public _doPreviewFile(): any;

	public fileQuickTransfer(): any;

	/**
	 *  发送文件消息
	 * @param options
	 * @param apns
	 */
	public sendFile(options: any, apns?: any): void | Message;

	public _previewAndSendFile(): any;

	public assembleUploadParams(): any;

	public deleteFile(): any;

	public getFile(): any;

	public getFileList(): any;

	/**
	 * 发送地理位置消息
	 * @param options
	 * @param apns
	 */
	public sendGeo(options: any, apns?: any): Message;

	/**
	 * 发送提醒消息
	 * @param options
	 * @param apns
	 */
	public sendTipMsg(options: TipMessageOption, apns?: any): Message;

	/**
	 * 发送自定义消息
	 * @param options
	 * @param apns
	 */
	public sendCustomMsg(options: any, apns?: any): Message;

	/**
	 * 给机器人发送消息
	 * @param options
	 * @param apns
	 */
	public sendRobotMsg(options: any, apns?: any): Message;

	public sendMsg(): any;

	public beforeSendMsg(): any;

	public afterSendMsg(): any;

	public formatReturnMsg(): any;

	/**
	 * 重发消息
	 * @param options
	 */
	public resendMsg(options: MessageOperateOption): void;

	/**
	 * 转发消息
	 * @param users
	 * @param account
	 */
	public forwardMsg(users: User[], account: string): void;

	public trimMsgFlag(): any;

	public beforeForwardMsg(): any;

	public _sendMsgByType(): any;

	public parseRobotTemplate(): any;

	public transDoc(): any;

	public getSimpleNosToken(): any;

	public getNosToken(): any;

	public getNosTokenTrans(): any;

	/**
	 * 修改图片下载的名字
	 * @param options
	 */
	public packFileDownloadName(options: any): void;

	/**
	 * 将音频 url 转为 mp3
	 * @param options
	 */
	public audioToMp3(options: any): void;

	public removeFile(): any;

	public fetchFile(): any;

	public fetchFileList(): any;

	/**
	 * 去除图片元信息
	 * @param options
	 */
	public stripImageMeta(options: any): void;

	/**
	 * 修改图片质量
	 * @param options
	 */
	public qualityImage(options: any): void;

	/**
	 * interlace 图片
	 * @param options
	 */
	public interlaceImage(options: any): void;

	/**
	 * 旋转图片
	 * @param options
	 */
	public rotateImage(options: any): void;

	/**
	 * 高斯模糊图片
	 * @param options
	 */
	public blurImage(options: any): void;

	/**
	 * 裁剪图片
	 * @param options
	 */
	public cropImage(options: any): void;

	/**
	 * 生成缩略图
	 * @param options
	 */
	public thumbnailImage(options: any): void;

	public beforeProcessImage(): any;

	/**
	 * 处理图片
	 * @param options
	 */
	public processImage(options: any): void;

	public genStripmetaOp(): any;

	public genQualityOp(): any;

	public genInterlaceOp(): any;

	public genRotateOp(): any;

	public genBlurOp(): any;

	public genCropOp(): any;

	public genThumbnailOp(): any;

	public getNosOriginUrl(): any;

	public viewImageSync(): any;

	/**
	 * 预览去除图片元信息
	 * @param options
	 */
	public viewImageStripMeta(options: any): void;

	public viewImageQuality(): any;

	public viewImageInterlace(): any;

	public viewImageRotate(): any;

	public viewImageBlur(): any;

	public viewImageCrop(): any;

	public viewImageThumbnail(): any;

	public uploadSdkLogUrl(): any;

	public getClientAntispamLexicon: (arg: { done: ErrorCallback<File> }) => any;

	public filterClientAntispam(): any;

	public reportLogs(): any;

	public signalingCreate(): any;

	public signalingDelay(): any;

	public signalingClose(): any;

	public signalingJoin(): any;

	public signalingLeave(): any;

	public signalingGetChannelInfo(): any;

	public signalingInvite(): any;

	public signalingCancel(): any;

	public signalingCreateAndJoin(): any;

	public signalingCall(): any;

	public signalingReject(): any;

	public signalingAccept(): any;

	public signalingControl(): any;

	public signalingSync(): any;

	public signalingMarkMsgRead(): any;
}

export abstract class NimProto extends NimEvent {
	public mergeObjArray(): any;

	public cutObjArray(): any;

	/**
	 * 合并登录端
	 * @param olds
	 * @param news
	 */
	public mergeLoginPorts(
		olds: LoginPort[],
		news: LoginPort | LoginPort[]
	): LoginPort[];

	/**
	 * 去除登录端
	 * @param olds
	 * @param invalids
	 */
	public cutLoginPorts(
		olds: LoginPort[],
		invalids: LoginPort | LoginPort[]
	): LoginPort[];

	/**
	 * 合并关系
	 * @param olds
	 * @param news
	 */
	public mergeRelations(
		olds: Relation[],
		news: Relation | Relation[]
	): Relation[];

	/**
	 * 去除关系
	 * @param olds
	 * @param invalids
	 */
	public cutRelations(
		olds: Relation[],
		invalids: Relation | Relation[]
	): Relation[];

	/**
	 * 在关系数组里面根据 account 找到对应的关系
	 */
	public findRelation(relations: Relation[], account: string): void;

	/**
	 * 合并好友
	 * @param olds
	 * @param news
	 */
	public mergeFriends(
		olds: Friend[],
		news: Friend | Friend[]
	): Friend[];

	/**
	 * 去除好友
	 * @param options
	 */
	public cutFriends(options: any): Friend[];

	/**
	 * 去除accounts对应的好友
	 * @param olds
	 * @param invalids
	 */
	public cutFriendsByAccounts(
		olds: Friend[],
		invalids: Friend | Friend[]
	): Friend[];

	/**
	 * 在好友数组里面根据 account 找到对应的好友
	 * @param friends
	 * @param account
	 */
	public findFriend(friends: Friend[], account: string): void;

	/**
	 * 合并名片
	 * @param olds
	 * @param news
	 */
	public mergeUsers(olds: User[], news: User | User[]): User[];

	/**
	 * 在名片数组里面根据 account 找到对应的名片
	 * @param users
	 * @param account
	 */
	public findUser(users: User[], account: string): User;

	/**
	 * 合并群
	 * @param olds
	 * @param news
	 */
	public mergeTeams(olds: Team[], news: Team | Team[]): Team[];

	/**
	 * 去除群
	 * @param olds
	 * @param invalids
	 */
	public cutTeams(
		olds: Team[],
		invalids: Team | Team[]
	): Team[];

	/**
	 * 在群数组里面根据 teamId 找到对应的群
	 */
	public findTeam(teams: Team[], teamId: string): Team;

	public assembleTeamOwner(): any;

	public assembleTeamMembers(): any;

	public genTeamMemberId(): any;

	/**
	 * 合并群成员
	 * @param olds
	 * @param news
	 */
	public mergeTeamMembers(
		olds: TeamMember[],
		news: TeamMember | TeamMember[]
	): TeamMember[];

	/**
	 * 去除群成员
	 * @param olds
	 * @param invalids
	 */
	public cutTeamMembers(
		olds: TeamMember[],
		invalids: TeamMember | TeamMember[]
	): TeamMember[];

	/**
	 * 去除accounts对应的群成员
	 * @param olds
	 * @param invalids
	 */
	public cutTeamMembersByAccounts(
		olds: TeamMember[],
		invalids: TeamMember | TeamMember[]
	): TeamMember[];

	/**
	 * 在群成员数组里面根据 id 找到对应的群成员
	 * @param sysMsgs
	 * @param id idServer
	 */
	public findTeamMember(
		sysMsgs: TeamMember[],
		id: string
	): TeamMember | null;

	/**
	 * 合并会话
	 * @param olds
	 * @param news
	 */
	public mergeSessions(
		olds: Session[],
		news: Session | Session[]
	): Session[];

	public cutSessions(): any;

	public cutSessionsByIds(): any;

	/**
	 * 在关系数组里面根据 account 找到对应的关系
	 */
	public findSession(sessions: Session[], sessionId: string): void;

	/**
	 * 合并消息
	 * @param olds
	 * @param news
	 */
	public mergeMsgs(
		olds: Message[],
		news: Message | Message[]
	): Message[];

	public cutMsgs(): any;

	public cutMsgsByIdClients(): any;

	/**
	 * 在消息数组里面根据 idClient 找到对应的消息
	 */
	public findMsg(msgs: Message[], idClient: string): void;

	/**
	 * 合并系统通知
	 * @param olds
	 * @param news
	 */
	public mergeSysMsgs(
		olds: SystemMessage[],
		news: SystemMessage | SystemMessage[]
	): SystemMessage[];

	public cutSysMsgs(): any;

	public cutSysMsgsByIdServers(): any;

	/**
	 * 在系统通知数组里面根据 idServer 找到对应的系统通知
	 * @param sysMsgs
	 * @param idServer
	 */
	public findSysMsg(sysMsgs: SystemMessage[], idServer: string): void;

	/**
	 * 踢当前用户登录的其它端
	 * @param options
	 */
	public kick(options: any): void;

	/**
	 * 加入黑名单/从黑名单移除
	 * @param options
	 */
	public markInBlacklist(options: { account: string | number; isAdd: boolean; done: ErrorCallback<any> }): void;

	/**
	 * 加入黑名单
	 * @param options
	 */
	public addToBlacklist(options: { account: string | number; done: ErrorCallback<any> }): void;

	/**
	 * 从黑名单移除
	 * @param options
	 */
	public removeFromBlacklist(options: { account: string | number; done: ErrorCallback<any> }): void;

	/**
	 * 加入静音列表/从静音列表移除
	 * @param options
	 */
	public markInMutelist(options: { account: string | number; isAdd: 'true' | 'false'; done: ErrorCallback<any> }): void;

	/**
	 * 加入静音列表
	 * @param options
	 */
	public addToMutelist(options: { account: string | number; done: ErrorCallback<any> }): void;

	/**
	 * 从静音列表移除
	 * @param options
	 */
	public removeFromMutelist(options: { account: string | number; done: ErrorCallback<any> }): void;

	/**
	 * 获取黑名单和静音列表
	 * @param options
	 */
	public getRelations(options: { done: ErrorCallback<any> }): void;

	/**
	 * 更新我的名片
	 * @param options
	 */
	public updateMyInfo(options: User): void;

	public getMyInfo(): any;

	/**
	 * 获取用户名片
	 * @param options
	 */
	public getUser(options: { account: string; done: ErrorCallback<User> }): void;

	/**
	 * 获取用户名片数组
	 * @param options
	 */
	public getUsers(options: any): void;

	public friendRequest(): any;

	/**
	 * 直接加为好友
	 * 直接加某个用户为好友后, 对方不需要确认, 直接成为当前登录用户的好友。
	 * 对方会收到一条类型为'addFriend'的系统通知, 此类系统通知的from字段的值为申请方的帐号, to字段的值为接收方的账号
	 * @param addFriendOptions
	 */
	public addFriend(addFriendOptions: AddFriendOptions): void;

	/**
	 * 申请加为好友
	 * @param options
	 */
	public applyFriend(options: AddFriendOptions): void;

	/**
	 * 通过好友申请
	 * @param options
	 */
	public passFriendApply(options: { idServer: number | string } & AddFriendOptions): void;

	/**
	 * 拒绝好友申请
	 * @param options
	 */
	public rejectFriendApply(options: { idServer: number | string } & AddFriendOptions): void;

	/**
	 * 删除好友
	 * @param options
	 */
	public deleteFriend(options: { account: string; delAlias: boolean; done: ErrorCallback<any> }): void;

	/**
	 * 更新好友
	 * @param options
	 */
	public updateFriend(options: User & { done: ErrorCallback<any> }): void;

	/**
	 * 获取好友列表
	 * @param options
	 */
	public getFriends(options: { done: ErrorCallback<Friend[]> }): void;

	public getRobots(): any;

	/**
	 * 创建群
	 * @param options
	 */
	public createTeam(options: CreateTeamOption): void;

	/**
	 * 更新群
	 * @param options
	 */
	public updateTeam(options: UpdateTeamOption): void;

	/**
	 * 拉人入群
	 */
	public addTeamMembers(options: AddTeamOption): void;

	/**
	 * 踢人出群
	 * @param options
	 */
	public removeTeamMembers(options: RemoveTeamMembersOption): void;

	/**
	 * 接受入群邀请
	 * 高级群的群主和管理员在邀请成员加入群（通过操作创建群或拉人入群）之后, 被邀请的人会收到一条类型为'teamInvite'的系统通知, 此类系统通知的from字段的值为邀请方的帐号, to字段的值为对应的群ID, 此类系统通知的attach有一个字段team的值为被邀请进入的群, 被邀请的人可以选择接受邀请或者拒绝邀请。
	 * 如果接受入群邀请, 那么该群的所有群成员会收到一条类型为'acceptTeamInvite'的群通知消息, 此类群通知消息的from字段的值为接受入群邀请的人的帐号, to字段的值为对应的群ID, attach有一个字段team的值为对应的群对象, attach有一个字段members的值为接收入群邀请的群成员列表。
	 * 如果拒绝入群邀请, 那么邀请你的人会收到一条类型为'rejectTeamInvite'的系统通知, 此类系统通知的from字段的值为拒绝入群邀请的人的帐号, to字段的值为对应的群ID。
	 * @param options
	 */
	public acceptTeamInvite(options: AcceptTeamInviteOptions): void;

	/**
	 * 拒绝入群邀请
	 * @param options
	 */
	public rejectTeamInvite(options: RejectTeamInviteOption): void;

	/**
	 * 申请入群
	 * @param options
	 */
	public applyTeam(options: ApplyTeamOption): void;

	/**
	 * 通过入群申请
	 * @param options
	 */
	public passTeamApply(options: PassTeamApplyOption): void;

	/**
	 * 拒绝入群申请
	 * @param options
	 */
	public rejectTeamApply(options: RejectTeamApplyOption): void;

	/**
	 * 添加群管理员
	 * 添加群管理员后, 所有群成员会收到一条类型为'addTeamManagers'的群通知消息。
	 * 此类群通知消息的from字段的值为添加群管理员的人的帐号, to字段的值为对应的群ID, attach有一个字段accounts的值为被加为管理员的帐号列表,
	 * attach有一个字段members的值为被加为管理员的群成员列表。
	 * @param addTeamManagersOptions
	 */
	public addTeamManagers(
		addTeamManagersOptions: AddTeamManagersOptions
	): void;

	/**
	 * 移除群管理员
	 * @param options
	 */
	public removeTeamManagers(options: AddTeamManagersOptions): void;

	/**
	 * 修改自己的群属性
	 * @param options
	 */
	public updateInfoInTeam(options: UpdateInfoTeamOption): void;

	/**
	 * 修改别人的群昵称
	 * @param options
	 */
	public updateNickInTeam(options: UpdateNickInTeam): void;

	/**
	 * 更新群成员禁言状态
	 * @param options
	 */
	public updateMuteStateInTeam(options: UpdateMuteStateInTeamOption): void;

	/**
	 * 获取群禁言成员列表
	 * @param options
	 */
	public getMutedTeamMembers(options: { teamId: string | number; done: ErrorCallback<any> }): void;

	/**
	 * 主动退群
	 * @param options
	 */
	public leaveTeam(options: { teamId: string; done: ErrorCallback<any> }): void;

	/**
	 * 转让群
	 * @param options
	 */
	public transferTeam(options: TransferTeamOption): void;

	/**
	 * 解散群
	 * @param options
	 */
	public dismissTeam(options: { teamId: number; done: ErrorCallback<any> }): void;

	/**
	 * 获取群
	 * @param options
	 */
	public getTeam(options: { teamId: number | string; done: ErrorCallback<Team> }): void;

	/**
	 * 获取群列表
	 * @param options
	 */
	public getTeams(options: { teamId: number | string; done: ErrorCallback<Team[]> }): void;

	/**
	 * 获取群成员
	 * 如果开发者在初始化SDK时选择设置了syncTeamMembers为false, 那么就收不到onteammembers回调, 可以调用此方法来获取群成员列表
	 * @param options
	 */
	public getTeamMembers(options: { teamId: number | string; done: ErrorCallback<any> }): void;

	/**
	 * 通过群ID及成员账号获取群成员信息
	 * @param options
	 */
	public getTeamMemberByTeamIdAndAccount(options: { teamId: number | string; account: string; done: ErrorCallback<any> }): void;

	/**
	 * 是否需要群消息通知
	 * @param options
	 */
	public notifyForNewTeamMsg(options: { teamIds: number[] | string[]; done: ErrorCallback<any> }): void;

	public getMyTeamMembers(): any;

	/**
	 * 获取teamIds对应的本地群
	 * @param options
	 */
	public getLocalTeams(options: any): void;

	public getLocalTeamMembers(): any;

	/**
	 * 删除 teamId 对应的本地群
	 * @param options
	 */
	public deleteLocalTeam(options: any): void;

	/**
	 * 群组禁言
	 * @param options
	 */
	public muteTeamAll(options: MuteTeamAllOption): void;

	/**
	 * 标记群组消息已读
	 * @param options
	 */
	public sendTeamMsgReceipt(options: {
		teamMsgReceipts: { teamId: string | number; idServer: string }[];
		done: ErrorCallback<any>;
	}): void;

	/**
	 * 查询群组消息已读、未读数量
	 * @param options
	 */
	public getTeamMsgReads(options: {
		teamMsgReceipts: { teamId: string | number; idServer: string }[];
		done: ErrorCallback<any>;
	}): void;

	/**
	 * 查询群组已读、未读账号列表
	 * @param options
	 */
	public getTeamMsgReadAccounts(options: {
		teamMsgReceipts: { teamId: string | number; idServer: string }[];
		done: ErrorCallback<any>;
	}): void;

	/**
	 * 设置当前会话
	 * @param sessionId
	 */
	public setCurrSession(sessionId: string): void;

	public resetAllSessionUnread(): any;

	/**
	 * 重置某个会话的未读数
	 * @param sessionId
	 */
	public resetSessionUnread(sessionId: string): void;

	/**
	 * 重置当前会话
	 */
	public resetCurrSession(): void;

	/**
	 * 插入一条本地会话记录
	 * @param options
	 */
	public insertLocalSession(options: any): void;

	/**
	 * 获取本地会话列表
	 * @param options
	 */
	public getLocalSessions(options: { sessionId?: string | number; lastSessionId?: string | number; limit?: number; done?: ErrorCallback<any> }): void;

	/**
	 * 通过sessionId获取本地会话
	 * @param options
	 */
	public getLocalSession(options: any): void;

	/**
	 * 更新本地会话
	 * @param options
	 */
	public updateLocalSession(options: { id: string; localCustom: JsonString; done: ErrorCallback<any> }): void;

	/**
	 * 删除本地会话
	 * @param options
	 */
	public deleteLocalSession(options: { id: string; done: ErrorCallback<any> }): void;

	/**
	 * 删除服务器上的会话
	 * @param options
	 */
	public deleteSession(options: { scene: MessageScene; to: string; done: ErrorCallback<any> }): void;

	/**
	 * 批量删除服务器上的会话
	 * @param options
	 */
	public deleteSessions(options: { sessions: { scene: MessageScene; to: string }[]; done: ErrorCallback<any> }): void;

	public beforeSendMsg(): any;

	public afterSendMsg(): any;

	public beforeForwardMsg(): any;

	/**
	 * 标记消息为已收到
	 * @param msgs
	 */
	public markMsgRead(msgs: Message | Message[]): void;

	/**
	 * 发送消息已读回执
	 * @param options
	 */
	public sendMsgReceipt(options: any): void;

	/**
	 * 查询消息是否被对方读过了
	 * @param msg
	 */
	public isMsgRemoteRead(msg: Message): boolean;

	/**
	 * 撤回消息
	 * @param arg
	 */
	public deleteMsg(arg: { msg: Message } & SendOption<Message>): void;

	/**
	 * 获取云端历史记录
	 * @param options
	 */
	public getHistoryMsgs(options: any): void;

	public searchHistoryMsgs(): any;

	/**
	 * 获取本地历史记录
	 * @param options
	 */
	public getLocalMsgs(options: any): void;

	/**
	 * 获取 idClient 对应的本地消息
	 * @param options
	 */
	public getLocalMsgByIdClient(options: any): void;

	/**
	 * 获取 idClients 对应的本地消息
	 * @param options
	 */
	public getLocalMsgsByIdClients(options: any): void;

	/**
	 * 更新本地消息
	 * @param options
	 */
	public updateLocalMsg(options: any): void;

	/**
	 * 删除本地消息
	 * @param options
	 */
	public deleteLocalMsg(options: any): void;

	/**
	 * 删除某个会话的本地消息
	 * @param options
	 */
	public deleteLocalMsgsBySession(options: any): void;

	/**
	 * 删除所有本地消息
	 */
	public deleteAllLocalMsgs(options: any): void;

	public clearServerHistoryMsgs(): any;

	public markSysMsgRead(options: {sysMsgs: Message[]; done: ErrorCallback<any>}): any;

	/**
	 * 发送自定义系统通知
	 * @param options
	 */
	public sendCustomSysMsg(options: any): string;

	public formatReturnSysMsg(): any;

	/**
	 * 获取本地系统通知
	 * @param options
	 */
	public getLocalSysMsgs(options: any): void;

	/**
	 * 更新本地系统通知
	 * @param options
	 */
	public updateLocalSysMsg(options: any): void;

	/**
	 * 删除本地系统通知
	 * @param options
	 */
	public deleteLocalSysMsg(options: any): void;

	/**
	 * 删除所有本地系统通知
	 */
	public deleteAllLocalSysMsgs(options: any): void;

	/**
	 * 获取聊天室服务器地址
	 * @param options
	 */
	public getChatroomAddress(options: any): void;

	/**
	 * 音频转文字
	 * @param options
	 */
	public audioToText(options: any): void;

	public clearDB(): any;

	public removeDB(): any;

	public closeDB(): any;

	/**
	 * 获取当前多端推送配置选项
	 * @param options
	 */
	public getPushNotificationMultiportConfig(options: any): any;

	public updatePushNotificationMultiportConfig(): any;

	public batchSendEventsCmds(): any;

	/**
	 * 发布事件
	 * @param options
	 */
	public publishEvent(options: any): void;

	/**
	 * 订阅事件
	 * @param options
	 */
	public subscribeEvent(options: any): void;

	/**
	 * 按账号取消指定事件的订阅关系
	 * @param options
	 */
	public unSubscribeEventsByAccounts(options: any): void;

	/**
	 * 取消指定事件的全部订阅关系
	 * @param options
	 */
	public unSubscribeEventsByType(options: any): void;

	/**
	 * 按账号获取指定事件的订阅关系
	 * @param options
	 */
	public querySubscribeEventsByAccounts(options: any): void;

	/**
	 * 查询指定事件的全部订阅关系
	 * @param options
	 */
	public querySubscribeEventsByType(options: any): void;
}
