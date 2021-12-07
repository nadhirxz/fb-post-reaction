import * as ora from 'ora';
export declare const spinners: {
    init: ora.Ora;
    login: ora.Ora;
    reaction: ora.Ora;
};
export declare const stopAllSpinners: (success?: boolean) => void;
