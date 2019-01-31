/**
 * I provide a ajax API.
 */
export class HttpClient {

	/**
	 * I build up a a--browser-conform XMLHttpRequest Object.
	 * @returns {XMLHttpRequest}
	 * @constructor
	 */
	public static get XMLHttp() {
		let xmlHttpObject: XMLHttpRequest;

		// Check if XMLHttpRequest-Class is available
		// If so create Object for IE7, Firefox, etc.
		if (typeof XMLHttpRequest !== 'undefined') {
			xmlHttpObject = new XMLHttpRequest();
		}
		// If Object is not known by the browser try to create a XMLHTTP-Object.
		// IE6 & IE5
		if (!xmlHttpObject) {
			try {
				xmlHttpObject = new ActiveXObject('Msxml2.XMLHTTP');
			}
			catch (e) {
				try {
					xmlHttpObject = new ActiveXObject('Microsoft.XMLHTTP');
				}
				catch (e) {
					xmlHttpObject = null;
				}
			}
		}
		return xmlHttpObject;
	}

	/**
	 * I perform a GET request
	 * @param {string} url
	 * @param {Function} callback
	 */
	public static get = (url: string, callback?: Function): void => {
		const request: XMLHttpRequest = HttpClient.XMLHttp;
		request.open('GET', url, true);
		request.send(null);
		request.onreadystatechange = function () {
			if (callback && request.readyState === 4) {
				switch (request.status) {
					case 0:
					case 404: {
						callback.apply(this, ['error']);
						break;
					}
					case 200: {
						const data: string = JSON.parse(request.responseText || request.response);
						callback.apply(this, [data]);
						break;
					}
				}
			}
		};
	};
}