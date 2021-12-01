"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var Reaction_1 = require("./utils/Reaction");
var ReactionMaker_1 = require("./utils/ReactionMaker");
require('pkginfo')(module);
if (require.main === module) {
    commander_1.program
        .version(module.exports.version)
        .description(module.exports.description)
        .argument('<username>', 'facebook username/email/phone')
        .argument('<password>', 'facebook password')
        .argument('<post>', 'facebook post id')
        .addOption(new commander_1.Option('-r, --reaction <reaction>', 'facebook reaction').choices(__spreadArray([], Reaction_1.reactions)).default('like'))
        .action(function (username, password, post) { return new ReactionMaker_1.default(username, password, post).react(commander_1.program.opts().reaction); })
        .parse();
}
exports.default = ReactionMaker_1.default;
