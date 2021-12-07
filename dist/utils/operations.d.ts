import { spinners } from './spinners';
export declare const operation: (spinner: keyof typeof spinners, method: () => Promise<{
    success: boolean;
    error: string;
}>) => Promise<void>;
export declare const errors: {
    [key: string]: string;
};
export declare const success: (msg: string) => void;
export declare const err: (msg: string) => void;
