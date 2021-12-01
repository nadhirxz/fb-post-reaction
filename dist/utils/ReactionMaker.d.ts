import { Reaction } from './Reaction';
export default class ReactionMaker {
    username: string;
    password: string;
    post: string;
    constructor(username: string, password: string, post: string);
    react(reaction: Reaction): Promise<void>;
}
