import * as ora from 'ora';

const spinner = { spinner: { interval: 200, frames: ['-', '\\', '|', '/'] }, color: 'yellow' };
const createSpinner = (text: string) => ora({ text, spinner: spinner.spinner, color: spinner.color as ora.Color });

export const spinners = {
	init: createSpinner('initializing'),
	login: createSpinner('logging in'),
	reaction: createSpinner('reacting to post'),
};
