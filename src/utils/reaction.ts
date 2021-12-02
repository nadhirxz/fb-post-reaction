import * as puppeteer from 'puppeteer';

const BASE_URL = 'https://www.facebook.com';

export const reactions = ['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry'] as const;

export type Reaction = typeof reactions[number];

export default class ReactionExecutor {
	browser?: puppeteer.Browser;
	page?: puppeteer.Page;

	constructor(public username: string, public password: string, public post: string) {}

	async init() {
		try {
			this.browser = await puppeteer.launch({ headless: process.env.NODE_ENV == 'production' });
			this.page = await this.browser?.newPage();
			const context = this.browser.defaultBrowserContext();
			context.overridePermissions('https://www.facebook.com', ['geolocation', 'notifications']);
			return { success: true, error: '' };
		} catch (error) {
			return { success: false, error: 'init' };
		}
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

			return loginSuccess ? { success: true, error: '' } : { success: false, error: 'login' };
		}
		return { success: false, error: 'init' };
	}

	async react(reaction: Reaction) {
		if (this.page) {
			await this.page.goto(`${BASE_URL}/${this.post}`);

			const commentButton = await this.page.$('div[aria-label="Leave a comment"]');

			if (commentButton) {
				await this.page.waitForTimeout(2000);

				await this.page.evaluate(() =>
					Array.from(document.querySelectorAll('div[role="article"]'))
						.slice(1)
						.forEach(element => (element.innerHTML = ''))
				);

				const parent = (await commentButton.$x('..'))[0];
				const likeButton = (await parent.$x('preceding-sibling::div[1]'))[0];

				await this.page.waitForTimeout(2000);

				await likeButton.hover();

				const reactionSelector = `div[aria-label="${reaction.charAt(0).toUpperCase() + reaction.slice(1)}"]`;
				await this.page.waitForSelector(reactionSelector);
				await this.page.focus(reactionSelector);
				await this.page.keyboard.press('Enter');
				return { success: true, error: '' };
			}
			return { success: false, error: 'btn' };
		}
		return { success: false, error: 'init' };
	}

	async finish() {
		await this.browser?.close();
	}
}
