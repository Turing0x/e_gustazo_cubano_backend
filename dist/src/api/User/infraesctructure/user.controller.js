"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_models_1 = require("../domain/user.models");
const send_res_1 = require("../../../helpers/send.res");
async function getAllUsers(req, res) {
    try {
        const users = (await user_models_1.UserModel.find())
            .filter(e => e.role !== 'admin');
        return (0, send_res_1.goodResponse)(res, 'crud_mess_0', users);
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function getUserById(req, res) {
    try {
        const { userId } = req.params;
        if (!userId)
            return (0, send_res_1.badResponse)(res, 'mess_1');
        const user = await user_models_1.UserModel.findById(userId);
        if (!user)
            return (0, send_res_1.badResponse)(res, 'user_mess_8');
        return (0, send_res_1.goodResponse)(res, 'crud_mess_0', user);
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function saveUser(req, res) {
    try {
        const { username, password, full_name } = req.body;
        if (!username || !password || !full_name)
            return (0, send_res_1.badResponse)(res, 'mess_1');
        if (await user_models_1.UserModel.findOne({ username })) {
            return (0, send_res_1.badResponse)(res, 'user_mess_7');
        }
        const hashPassword = bcrypt_1.default.hashSync(password, 10);
        const referal_code = (0, uuid_1.v4)().split('-')[0].toLocaleUpperCase();
        const user = new user_models_1.UserModel({
            username,
            full_name,
            password: hashPassword,
            role: 'commercial',
            referal_code
        });
        await user.save();
        return (0, send_res_1.goodResponse)(res, 'user_mess_1');
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function sign(req, res) {
    try {
        const { username, password } = req.body;
        const user = await user_models_1.UserModel.findOne({ username });
        if (!user)
            return (0, send_res_1.badResponse)(res, 'user_mess_8');
        const compare = bcrypt_1.default.compareSync(password, user.password);
        if (!compare)
            return (0, send_res_1.badResponse)(res, 'server_mess_4');
        const token = jsonwebtoken_1.default.sign({ username: user.username, user_id: user._id, enable: user.enable }, process.env.JWT_KEY_APP, { expiresIn: '100m' });
        return (0, send_res_1.goodResponse)(res, 'server_mess_3', {
            userID: user._id,
            fullName: user.full_name,
            referalCode: user.referal_code,
            token,
            role: user.role.toLocaleLowerCase()
        });
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function editUserEnable(req, res) {
    try {
        const { enable } = req.body;
        const id = req.params.id;
        await user_models_1.UserModel.findOneAndUpdate({ _id: id }, {
            $set: { enable }
        });
        return (0, send_res_1.goodResponse)(res, 'user_mess_3');
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function resetPassword(req, res) {
    try {
        const { userId } = req.query;
        const password = await bcrypt_1.default.hash('0000', 10);
        user_models_1.UserModel.updateOne({ _id: userId }, { $set: { password } })
            .then(() => { return (0, send_res_1.goodResponse)(res, 'user_mess_9'); })
            .catch((err) => { return (0, send_res_1.badResponse)(res, 'user_mess_10', err.message); });
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function deleteUserById(req, res) {
    try {
        const { userId } = req.params;
        if (!userId)
            return (0, send_res_1.badResponse)(res, 'mess_1');
        await user_models_1.UserModel.deleteOne({ _id: userId });
        return (0, send_res_1.goodResponse)(res, 'user_mess_5', '');
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
exports.UserControllers = {
    deleteUserById,
    editUserEnable,
    resetPassword,
    getUserById,
    getAllUsers,
    saveUser,
    sign
};
//# sourceMappingURL=user.controller.js.map