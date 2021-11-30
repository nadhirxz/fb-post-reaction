import { program } from 'commander';
import { start } from './utils/start';
require('pkginfo')(module);

program
	.version(module.exports.version)
	.description(module.exports.description)
	.argument('<username>', 'facebook username/email/phone')
	.argument('<password>', 'facebook password')
	.argument('<post>', 'facebook post id')
	.action((username, password, post) => start(username, password, post))
	.parse();
