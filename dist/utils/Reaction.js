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
exports.reactions = void 0;
var puppeteer = require("puppeteer");
var BASE_URL = 'https://www.facebook.com';
exports.reactions = ['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry'];
var ReactionExecutor = /** @class */ (function () {
    function ReactionExecutor(username, password, post) {
        this.username = username;
        this.password = password;
        this.post = post;
    }
    ReactionExecutor.prototype.init = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c, context;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = this;
                        return [4 /*yield*/, puppeteer.launch({ headless: process.env.NODE_ENV == 'production' })];
                    case 1:
                        _b.browser = _d.sent();
                        _c = this;
                        return [4 /*yield*/, ((_a = this.browser) === null || _a === void 0 ? void 0 : _a.newPage())];
                    case 2:
                        _c.page = _d.sent();
                        context = this.browser.defaultBrowserContext();
                        context.overridePermissions('https://www.facebook.com', ['geolocation', 'notifications']);
                        return [2 /*return*/];
                }
            });
        });
    };
    ReactionExecutor.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loginSuccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.page) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.page.goto(BASE_URL)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.page.focus('input[name=email]')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.page.keyboard.type(this.username)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.page.focus('input[name=pass]')];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.page.keyboard.type(this.password)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.page.keyboard.press('Enter')];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.page.waitForNavigation()];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.page.goto(BASE_URL)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.page.evaluate(function () { return Boolean(document.querySelector('a[aria-label="Home"]')); })];
                    case 9:
                        loginSuccess = _a.sent();
                        return [2 /*return*/, loginSuccess ? { success: true } : { success: false, error: 'login' }];
                    case 10: return [2 /*return*/, { success: false, error: 'init' }];
                }
            });
        });
    };
    ReactionExecutor.prototype.react = function (reaction) {
        return __awaiter(this, void 0, void 0, function () {
            var commentButton, parent_1, likeButton, reactionSelector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.page) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.page.goto(BASE_URL + "/" + this.post)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.page.$('div[aria-label="Leave a comment"]')];
                    case 2:
                        commentButton = _a.sent();
                        if (!commentButton) return [3 /*break*/, 10];
                        return [4 /*yield*/, commentButton.$x('..')];
                    case 3:
                        parent_1 = (_a.sent())[0];
                        return [4 /*yield*/, parent_1.$x('preceding-sibling::div[1]')];
                    case 4:
                        likeButton = (_a.sent())[0];
                        return [4 /*yield*/, this.page.waitForTimeout(4000)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, likeButton.hover()];
                    case 6:
                        _a.sent();
                        reactionSelector = "div[aria-label=\"" + (reaction.charAt(0).toUpperCase() + reaction.slice(1)) + "\"]";
                        return [4 /*yield*/, this.page.waitForSelector(reactionSelector)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.page.focus(reactionSelector)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.page.keyboard.press('Enter')];
                    case 9:
                        _a.sent();
                        return [2 /*return*/, { success: true }];
                    case 10: return [2 /*return*/, { success: false, error: 'btn' }];
                    case 11: return [2 /*return*/, { success: false, error: 'init' }];
                }
            });
        });
    };
    ReactionExecutor.prototype.finish = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this.browser) === null || _a === void 0 ? void 0 : _a.close())];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ReactionExecutor;
}());
exports.default = ReactionExecutor;