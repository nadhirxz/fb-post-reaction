import * as ora from 'ora';

const spinner = { spinner: { interval: 200, frames: ['-', '\\', '|', '/'] }, color: 'yellow' };
const createSpinner = (text: string) => ora({ text, spinner: spinner.spinner, color: spinner.color as ora.Color });

export const spinners = {
	init: createSpinner('initializing'),
	login: createSpinner('logging in'),
	reaction: createSpinner('reacting to post'),
};

export const stopAllSpinners = (success: boolean = true) => {
	Object.keys(spinners).forEach(key => {
		const spinner = spinners[key as keyof typeof spinners];
		if (spinner.isSpinning) success ? spinner.succeed() : spinner.fail();
	});
};
