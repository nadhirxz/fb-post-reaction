export declare const operation: (method: () => Promise<{
    success: boolean;
    error: string;
}>, spinner?: "init" | "login" | "reaction" | undefined) => Promise<void>;
export declare const errors: {
    [key: string]: string;
};
export declare const success: (msg: string) => void;
export declare const err: (msg: string) => void;
