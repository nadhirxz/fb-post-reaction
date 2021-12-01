import ReactionExecutor, { Reaction } from './Reaction';

const errors: { [key: string]: string } = {
	init: 'could not initialize the headless browser',
	btn: 'could not find the reaction button',
	login: 'unable to login',
};

export default class ReactionMaker {
	constructor(public username: string, public password: string, public post: string) {}

	async react(reaction: Reaction) {
		const executor = new ReactionExecutor(this.username, this.password, this.post);
		await executor.init();
		try {
			const { success: loginSuccess, error: loginError } = await executor.login();
			if (loginSuccess) {
				const { success, error } = await executor.react(reaction);
				if (success) {
					console.log('reacted to post successfully');
					await executor.finish();
					return;
				}
				throw error;
			}
			throw loginError;
		} catch (error) {
			console.log('error:', errors[error as string] || error);
			await executor.finish();
		}
	}
}
