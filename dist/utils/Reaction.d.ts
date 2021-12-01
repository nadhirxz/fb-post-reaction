import * as puppeteer from 'puppeteer';
export declare const reactions: readonly ["like", "love", "care", "haha", "wow", "sad", "angry"];
export declare type Reaction = typeof reactions[number];
export default class ReactionExecutor {
    username: string;
    password: string;
    post: string;
    browser?: puppeteer.Browser;
    page?: puppeteer.Page;
    constructor(username: string, password: string, post: string);
    init(): Promise<void>;
    login(): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
    }>;
    react(reaction: Reaction): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
    }>;
    finish(): Promise<void>;
}
