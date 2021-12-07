#!/usr/bin/env node
import { Option, program } from 'commander';
import { reactions } from './utils/Reaction';
import ReactionMaker from './utils/ReactionMaker';
import { prompt } from 'inquirer';
import { bold } from 'chalk';
require('pkginfo')(module);

if (require.main === module) {
	program
		.version(module.exports.version)
		.description(module.exports.description)
		.argument('<post>', 'facebook post id')
		.option('-u, --username <username>', 'facebook username/email/phone')
		.option('-p, --password <password>', 'facebook password')
		.addOption(new Option('-r, --reaction <reaction>', 'facebook reaction').choices([...reactions]).default('like'))
		.action(async post => {
			let { username, password, reaction } = program.opts();
			if (!username) username = await prompt({ name: 'username', type: 'input', message: 'username:', validate: value => value.length > 0, prefix: bold.green('-') }).then(({ username }) => username);
			if (!password) password = await prompt({ name: 'password', type: 'password', mask: '*', message: 'password:', validate: value => value.length > 0, prefix: bold.green('-') }).then(({ password }) => password);
			new ReactionMaker(username, password, post).react(reaction);
		})
		.parse();
}

export default ReactionMaker;
