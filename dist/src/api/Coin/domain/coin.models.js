"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CoinSchema = new mongoose_1.default.Schema({
    mlc: {
        type: Number,
        default: true
    },
    usd: {
        type: Number,
        require: true,
    },
});
exports.CoinModel = mongoose_1.default.model('coins', CoinSchema);
//# sourceMappingURL=coin.models.js.map