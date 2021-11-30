import ReactionMaker, { Reaction } from './reaction';

export async function start(username: string, password: string, post: string, reaction: Reaction) {
	const liker = new ReactionMaker(username, password, post);
	await liker.init();
	try {
		const { success, error } = await liker.login();
		if (success) {
			const { success, error } = await liker.likePost(reaction);
			if (success) console.log('reacted to post successfully');
			else console.log('error:', error);
		} else {
			console.log('error:', error);
		}
		await liker.finish();
	} catch (error) {
		console.log('error:', error);
	}
}
