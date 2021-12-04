#!/usr/bin/env node
import { Option, program } from 'commander';
import { reactions } from './utils/Reaction';
import ReactionMaker from './utils/ReactionMaker';
require('pkginfo')(module);

if (require.main === module) {
	program
		.version(module.exports.version)
		.description(module.exports.description)
		.argument('<username>', 'facebook username/email/phone')
		.argument('<password>', 'facebook password')
		.argument('<post>', 'facebook post id')
		.addOption(new Option('-r, --reaction <reaction>', 'facebook reaction').choices([...reactions]).default('like'))
		.action((username, password, post) => new ReactionMaker(username, password, post).react(program.opts().reaction))
		.parse();
}

export default ReactionMaker;
