import { HttpClient } from './http-client.class';

export class JsonLoader {

	/**
	 * I load a json from a given URL and return a parsed JSON Object.
	 * @param {string} url
	 * @param {Function} callback
	 * @returns {any}
	 */
	public static load(url: string, callback: Function): any {
		HttpClient.get(url, (data: any) => callback.apply(this, [data]));
	}
}