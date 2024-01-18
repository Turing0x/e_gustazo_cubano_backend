"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    enable: {
        type: Boolean,
        require: false,
        default: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true,
    },
    commercial_code: {
        type: String,
        require: false,
    },
    personal_info: {
        type: Object,
        require: false,
    }
});
exports.UserModel = mongoose_1.default.model('users', UserSchema);
//# sourceMappingURL=user.models.js.map