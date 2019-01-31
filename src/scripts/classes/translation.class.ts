import { JsonLoader } from './json-loader.class';
import { TRANSLATION_DIR } from '../constants/global.constants';

export class Translation {

	/**
	 * The translations of the json file.
	 */
	private translations: any;

	constructor(private language: string, private callback?: Function) {
		this.loadTranslationFile();
	}

	/**
	 * I load the translations from a json file.
	 */
	private loadTranslationFile() {
		JsonLoader.load(TRANSLATION_DIR + this.language.toLowerCase() + '.json', (result) => {
			this.translations = result;
			if (this.callback) {
				this.callback.apply(this, [this.translations]);
			}
		});
	}
}