import { ReactionType } from './utils/Reaction';
interface Options {
    isCLI?: boolean;
    headlessBrowser?: boolean;
}
export { reactions } from './utils/Reaction';
export declare class Reaction {
    private username;
    private password;
    private post;
    private options?;
    constructor(username: string, password: string, post: string, options?: Options | undefined);
    react(reaction?: ReactionType): Promise<{
        success: boolean;
        error?: string | undefined;
    }>;
}
