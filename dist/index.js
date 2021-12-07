#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var Reaction_1 = require("./utils/Reaction");
var ReactionMaker_1 = require("./utils/ReactionMaker");
var inquirer_1 = require("inquirer");
var chalk_1 = require("chalk");
require('pkginfo')(module);
if (require.main === module) {
    commander_1.program
        .version(module.exports.version)
        .description(module.exports.description)
        .argument('<post>', 'facebook post id')
        .option('-u, --username <username>', 'facebook username/email/phone')
        .option('-p, --password <password>', 'facebook password')
        .addOption(new commander_1.Option('-r, --reaction <reaction>', 'facebook reaction').choices(__spreadArray([], Reaction_1.reactions)).default('like'))
        .action(function (post) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, username, password, reaction;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = commander_1.program.opts(), username = _a.username, password = _a.password, reaction = _a.reaction;
                    if (!!username) return [3 /*break*/, 2];
                    return [4 /*yield*/, inquirer_1.prompt({ name: 'username', type: 'input', message: 'username:', validate: function (value) { return value.length > 0; }, prefix: chalk_1.bold.green('-') }).then(function (_a) {
                            var username = _a.username;
                            return username;
                        })];
                case 1:
                    username = _b.sent();
                    _b.label = 2;
                case 2:
                    if (!!password) return [3 /*break*/, 4];
                    return [4 /*yield*/, inquirer_1.prompt({ name: 'password', type: 'password', mask: '*', message: 'password:', validate: function (value) { return value.length > 0; }, prefix: chalk_1.bold.green('-') }).then(function (_a) {
                            var password = _a.password;
                            return password;
                        })];
                case 3:
                    password = _b.sent();
                    _b.label = 4;
                case 4:
                    new ReactionMaker_1.default(username, password, post).react(reaction);
                    return [2 /*return*/];
            }
        });
    }); })
        .parse();
}
exports.default = ReactionMaker_1.default;
