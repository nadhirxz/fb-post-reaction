import { Option, program } from 'commander';
import { reactions } from './utils/reaction';
import { start } from './utils/start';
require('pkginfo')(module);

program
	.version(module.exports.version)
	.description(module.exports.description)
	.argument('<username>', 'facebook username/email/phone')
	.argument('<password>', 'facebook password')
	.argument('<post>', 'facebook post id')
	.addOption(new Option('-r, --reaction <reaction>', 'facebook reaction').choices([...reactions]).default('like'))
	.action((username, password, post) => start(username, password, post, program.opts().reaction))
	.parse();
