import ReactionExecutor, { Reaction } from './Reaction';
import { err, operation, success } from './operations';
import { errors } from 'puppeteer';

export default class ReactionMaker {
	constructor(public username: string, public password: string, public post: string) {}

	async react(reaction: Reaction) {
		const executor = new ReactionExecutor(this.username, this.password, this.post);
		try {
			await operation('init', async () => await executor.init());
			await operation('login', async () => await executor.login());
			await operation('reaction', async () => await executor.react(reaction));
			success('reacted to post successfully');
		} catch (error) {
			err(`error: ${errors[error as string] || error}`);
		} finally {
			await executor.finish();
		}
	}
}
