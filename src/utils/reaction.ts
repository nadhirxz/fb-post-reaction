import * as puppeteer from 'puppeteer';

const BASE_URL = 'https://www.facebook.com';

export default class ReactionMaker {
	browser?: puppeteer.Browser;
	page?: puppeteer.Page;

	constructor(public username: string, public password: string, public post: string) {}

	async init() {
		this.browser = await puppeteer.launch({ headless: false });
		this.page = await this.browser?.newPage();
		const context = this.browser.defaultBrowserContext();
		context.overridePermissions(BASE_URL, ['geolocation', 'notifications']);
	}
}
