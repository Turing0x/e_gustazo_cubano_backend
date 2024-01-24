"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goodResponse = exports.badResponse = void 0;
const messages_defines_1 = require("./messages.defines");
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const badResponse = (res, message, data = '', status) => {
    res.status(status ?? 500).json({
        api_message: messages_defines_1.MESSAGES[message],
        data
    }).end();
};
exports.badResponse = badResponse;
const goodResponse = (res, message, data = '') => {
    res.status(200).json({
        api_message: messages_defines_1.MESSAGES[message],
        data
    }).end();
};
exports.goodResponse = goodResponse;
//# sourceMappingURL=send.res.js.map