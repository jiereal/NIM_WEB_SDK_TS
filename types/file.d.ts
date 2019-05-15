/**
 * 文件对象
 * @typedef File
 */
import {DataUri} from "../../../../vscode/src/vs/base/common/resources";
import {ErrorCallback} from "@/nimSdk/types/error";
import {MessageScene} from "@/nimSdk/types/message";
import {SendOption} from "@/nimSdk/types/util";

export interface File {
	name: string;
	size: number;
	md5: string;
	url: string;
	ext: string;
}

/**
 * @typedef Image
 * @extends File
 */
export interface Image extends File {
	w: number; // 单位px
	h: number; // 单位px
}

/**
 * @typedef Audio
 * @extends File
 */
export interface Audio extends File {
	dur: number; // 单位ms
}

/**
 * @typedef Video
 * @extends Image
 * @extends Audio
 */
export interface Video extends Image, Audio {

}

export interface FileOption {
	type: 'image' | 'file' | 'audio' | 'video';
	fileInput?: HTMLElement | string;
	blob?: Blob;
	dataUrl?: string;
	filePath?: string;
	filePass: Image | Audio | Video;
	beginupload?: void;
	uploaddone?: ErrorCallback<Image | Audio | Video>;
	beforesend?: void;
	uploadprogress?: (arg: { total: string | number; loaded: string | number; percentage: string; percentageText: string }) => void;

	done: ErrorCallback<Image | Audio | Video>;
}

export interface SendFileOption extends FileOption, SendOption<Image | Audio | Video> {
}
