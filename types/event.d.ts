export interface ConnectEvent {
	lastLoginDeviceId?: string | number;
	customTag?: string | number;
	connectionId?: string | number;
	ip?: string;
	port?: string;
	country?: string;
}

export interface ReconnectEvent {
	duration: number | string; // 距离下次重连的时间
	retryCount: number; // 重连尝试的次数
}

export abstract class Event {
	public addListener(): void;
	public emit(): void;
	public eventNames(): string[];
	public listeners(): any;
	public off(): any;
	public on(): void;
	public once(): void;
	public removeListener(): void;
	public removeAllListeners(): void;
	public setMaxListeners(): void;
}
