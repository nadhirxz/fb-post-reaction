"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopAllSpinners = exports.spinners = void 0;
var ora = require("ora");
var spinner = { spinner: { interval: 200, frames: ['-', '\\', '|', '/'] }, color: 'yellow' };
var createSpinner = function (text) { return ora({ text: text, spinner: spinner.spinner, color: spinner.color }); };
exports.spinners = {
    init: createSpinner('initializing'),
    login: createSpinner('logging in'),
    reaction: createSpinner('reacting to post'),
};
var stopAllSpinners = function (success) {
    if (success === void 0) { success = true; }
    Object.keys(exports.spinners).forEach(function (key) {
        var spinner = exports.spinners[key];
        if (spinner.isSpinning)
            success ? spinner.succeed() : spinner.fail();
    });
};
exports.stopAllSpinners = stopAllSpinners;
