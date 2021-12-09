import * as puppeteer from 'puppeteer';
export declare const reactions: readonly ["like", "love", "care", "haha", "wow", "sad", "angry"];
export declare type ReactionType = typeof reactions[number];
export declare class ReactionExecutor {
    username: string;
    password: string;
    post: string;
    headless: boolean;
    browser?: puppeteer.Browser;
    page?: puppeteer.Page;
    constructor(username: string, password: string, post: string, headless: boolean);
    init(): Promise<{
        success: boolean;
        error: string;
    }>;
    login(): Promise<{
        success: boolean;
        error: string;
    }>;
    react(reaction: ReactionType): Promise<{
        success: boolean;
        error: string;
    }>;
    finish(): Promise<void>;
}
