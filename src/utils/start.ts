import ReactionMaker from './reaction';

export async function start(username: string, password: string, post: string) {
	const liker = new ReactionMaker(username, password, post);
	await liker.init();

	const { success, error } = await liker.login();
	if (success) {
		// ..
	} else {
		console.log('error:', error);
	}
}
