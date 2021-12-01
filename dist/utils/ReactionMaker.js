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
Object.defineProperty(exports, "__esModule", { value: true });
var Reaction_1 = require("./Reaction");
var errors = {
    init: 'could not initialize the headless browser',
    btn: 'could not find the reaction button',
    login: 'unable to login',
};
var ReactionMaker = /** @class */ (function () {
    function ReactionMaker(username, password, post) {
        this.username = username;
        this.password = password;
        this.post = post;
    }
    ReactionMaker.prototype.react = function (reaction) {
        return __awaiter(this, void 0, void 0, function () {
            var executor, _a, loginSuccess, loginError, _b, success, error, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        executor = new Reaction_1.default(this.username, this.password, this.post);
                        return [4 /*yield*/, executor.init()];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 8, , 10]);
                        return [4 /*yield*/, executor.login()];
                    case 3:
                        _a = _c.sent(), loginSuccess = _a.success, loginError = _a.error;
                        if (!loginSuccess) return [3 /*break*/, 7];
                        return [4 /*yield*/, executor.react(reaction)];
                    case 4:
                        _b = _c.sent(), success = _b.success, error = _b.error;
                        if (!success) return [3 /*break*/, 6];
                        console.log('reacted to post successfully');
                        return [4 /*yield*/, executor.finish()];
                    case 5:
                        _c.sent();
                        return [2 /*return*/];
                    case 6: throw error;
                    case 7: throw loginError;
                    case 8:
                        error_1 = _c.sent();
                        console.log('error:', errors[error_1] || error_1);
                        return [4 /*yield*/, executor.finish()];
                    case 9:
                        _c.sent();
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    return ReactionMaker;
}());
exports.default = ReactionMaker;
