import ReactionMaker from './reaction';

export async function start(username: string, password: string, post: string) {
	const liker = new ReactionMaker(username, password, post);
	await liker.init();
	// ..
}
