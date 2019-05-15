/**
 * 位置实体
 * @typedef Geolocation
 */
import {SendOption} from './util';

export interface Geolocation {
	lng: number;
	lat: number;
	title: string;
}

export interface SendGeoOption extends SendOption<Geolocation>{
	geo: Geolocation;
}
