import * as puppeteer from 'puppeteer';

const BASE_URL = 'https://www.facebook.com';

export default class Liker {
	browser?: puppeteer.Browser;
	page?: puppeteer.Page;

	constructor(public username: string, public password: string, public post: string) {}

	async init() {
		this.browser = await puppeteer.launch({ headless: false });
		this.page = await this.browser?.newPage();
		const context = this.browser.defaultBrowserContext();
		context.overridePermissions('https://www.facebook.com', ['geolocation', 'notifications']);
	}

	async login() {
		if (this.page) {
			await this.page.goto(BASE_URL);

			await this.page.focus('input[name=email]');
			await this.page.keyboard.type(this.username);

			await this.page.focus('input[name=pass]');
			await this.page.keyboard.type(this.password);

			await this.page.keyboard.press('Enter');

			await this.page.waitForNavigation();

			await this.page.goto(BASE_URL);

			const loginSuccess = await this.page.evaluate(() => Boolean(document.querySelector('a[aria-label="Home"]')));

			return loginSuccess ? { success: true } : { success: false, error: 'login' };
		}
		return { success: false, error: 'init' };
	}
}
