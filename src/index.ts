import { ParamsDetector } from './scripts/classes/params.class';
import { Translation } from './scripts/classes/translation.class';
import { DEFAULT_LANGUAGE } from './scripts/constants/global.constants';
import { IQueryParams } from './scripts/models/queryParams.model';

class TsFrontend {

	/**
	 * URL Parameters
	 * @type {IQueryParams}
	 */
	queryParams: IQueryParams = {};

	/**
	 * Title element
	 * @type {HTMLElement}
	 */
	title: HTMLElement = document.getElementById('title') as HTMLElement;

	/**
	 * Subtitle element
	 * @type {HTMLElement}
	 */
	subtitle: HTMLElement = document.getElementById('subtitle') as HTMLElement;

	/**
	 * content element
	 * @type {HTMLElement}
	 */
	content: HTMLElement = document.getElementById('content') as HTMLElement;

	/**
	 * The text translations
	 */
	translations: any;

	constructor() {
		this.initialize();
	}

	/**
	 * I initialize the app by setting the eventListeners and collecting data of process behavior.
	 */
	private initialize = (): void => {
		this.queryParams = ParamsDetector.params;
		const language = this.queryParams.language || DEFAULT_LANGUAGE;

		new Translation(language, (result) => {
			this.translations = result;
			this.translate(this.title, 'TITLE');
			this.translate(this.subtitle, 'SUBTITLE');
			this.translate(this.content, 'CONTENT');
		});
	};

	/**
	 * I fill in the translations to the ui elements.
	 */
	private translate = (element: HTMLElement, translate: string): void => {
		element.innerHTML = this.translations[translate];
	};
}

new TsFrontend();