import { spinners, stopAllSpinners } from './spinners';
import { bold } from 'chalk';

export const operation = async (method: () => Promise<{ success: boolean; error: string }>, spinner?: keyof typeof spinners) => {
	spinner != null && spinners[spinner].start();
	const { success, error } = await method();
	if (!success) {
		spinner != null && spinners[spinner].fail();
		throw error;
	}
	spinner != null && spinners[spinner].succeed();
};

export const errors: { [key: string]: string } = {
	init: 'could not initialize the headless browser',
	btn: 'could not find the reaction button',
	login: 'unable to login',
};

export const success = (msg: string) => {
	stopAllSpinners();
	console.log(bold.green(msg));
};

export const err = (msg: string) => {
	stopAllSpinners(false);
	console.log(bold.red(msg));
};
