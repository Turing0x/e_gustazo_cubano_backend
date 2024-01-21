"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_models_1 = require("../api/User/domain/user.models");
const send_res_1 = require("./send.res");
async function checkAuth(req, res, next) {
    try {
        const token = req.headers['access-token'];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY_APP);
        const { enable, role } = await user_models_1.UserModel.findOne({ _id: decoded['user_id'] })
            .select(['_id', 'username', 'enable', 'role'])
            .populate('role');
        if (enable) {
            res['userData'] = { role, ...decoded };
            return next();
        }
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'server_mess_5', error.message);
    }
}
exports.checkAuth = checkAuth;
//# sourceMappingURL=checkAuth.js.map