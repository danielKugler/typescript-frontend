import { IQueryParams } from '../models/queryParams.model';
import { DEFAULT_LANGUAGE } from '../constants/global.constants';

/**
 * I generate a object based on valid (see interface IQueryParams) query parameters
 * and provide them via static method.
 */
export class ParamsDetector {

	/**
	 * Reading the URLs query parameters and returning them as an IQueryParams object.
	 * @returns {IQueryParams}
	 */
	public static get params(): IQueryParams {

		let searchText = location.search || null;

		let queries: IQueryParams = {
			language: DEFAULT_LANGUAGE
		};

		if (searchText && searchText.indexOf('?') >= 0) {
			searchText = searchText.substring(1);
		}

		if (searchText && searchText !== '') {
			const queryParts: string[] = searchText.split('&');

			for (let i = 0, l = queryParts.length; i < l; i++) {
				const splittings: any[] = queryParts[i].split('=');
				const name: string = splittings[0] || null;
				const value: string | boolean = splittings[1] || true;
				if (name && Object.keys(queries).indexOf(name) >= 0) {
					queries[name] = value.toString();
				}
			}
		}
		return queries;
	}
}