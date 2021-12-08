import ReactionExecutor, { Reaction } from './utils/Reaction';
import { err, operation, success } from './utils/operations';
import { errors } from 'puppeteer';

export { reactions } from './utils/Reaction';

export class ReactionMaker {
	constructor(public username: string, public password: string, public post: string, public isCLI: boolean = false) {}

	async react(reaction: Reaction) {
		const executor = new ReactionExecutor(this.username, this.password, this.post);
		try {
			await operation(async () => await executor.init(), this.isCLI ? 'init' : undefined);
			await operation(async () => await executor.login(), this.isCLI ? 'login' : undefined);
			await operation(async () => await executor.react(reaction), this.isCLI ? 'reaction' : undefined);
			this.isCLI && success('reacted to post successfully');
		} catch (error) {
			err(`error: ${errors[error as string] || error}`);
		} finally {
			await executor.finish();
		}
	}
}
