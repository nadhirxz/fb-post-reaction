import { ReactionExecutor, ReactionType } from './utils/Reaction';
import { err, operation, success } from './utils/operations';
import { errors } from 'puppeteer';

interface Options {
	isCLI?: boolean;
	headlessBrowser?: boolean;
}

export { reactions } from './utils/Reaction';

export class Reaction {
	constructor(private username: string, private password: string, private post: string, private options?: Options) {}

	async react(reaction: ReactionType) {
		const executor = new ReactionExecutor(this.username, this.password, this.post, this.options?.headlessBrowser ?? true);
		const isCLI = this.options?.isCLI === true;
		let returnData: { success: boolean; error?: string } = { success: false };
		try {
			await operation(async () => await executor.init(), isCLI ? 'init' : undefined);
			await operation(async () => await executor.login(), isCLI ? 'login' : undefined);
			await operation(async () => await executor.react(reaction), isCLI ? 'reaction' : undefined);
			isCLI && success('reacted to post successfully');
			returnData = { success: true };
		} catch (error) {
			returnData = { success: false, error: errors[error as string]?.name || (error as string) };
			err(`error: ${returnData.error}`);
		} finally {
			await executor.finish();
			return returnData;
		}
	}
}
