export interface SyncMarkInfo {
	account: string;
	isAdd: boolean;
}

export interface SyncMarkInBlacklistInfo extends SyncMarkInfo {
}

export interface SyncMarkInMutelistInfo extends SyncMarkInfo {
}
