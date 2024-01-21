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
const order_models_1 = require("../../Order/domain/order.models");
const send_res_1 = require("../../../helpers/send.res");
async function getAllUsers(req, res) {
    try {
        const users = (await user_models_1.UserModel.find({ role: 'commercial' }));
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
async function getCommisionByCommercial(req, res) {
    try {
        const commisionData = new Map();
        const allObjs = [];
        const { userId } = req.params;
        if (!userId)
            return (0, send_res_1.badResponse)(res, 'mess_1');
        const user = await user_models_1.UserModel.findById(userId);
        if (!user)
            return (0, send_res_1.badResponse)(res, 'user_mess_8');
        const hisOrders = await order_models_1.OrderModel.find({
            'seller.commercialCode': user.commercial_code
        }).lean();
        for (const order of hisOrders) {
            order.product_list.forEach(product => {
                const id = product['_id'];
                if (!commisionData.has(id)) {
                    commisionData.set(id, {
                        name: product['name'],
                        price: product['price'],
                        commission: product['commission'],
                        cantToBuy: product['cantToBuy'],
                        date: order.date
                    });
                }
                else {
                    commisionData.get(id).cantToBuy += product['cantToBuy'];
                }
            });
        }
        allObjs.push(Object.fromEntries(commisionData));
        return (0, send_res_1.goodResponse)(res, 'crud_mess_0', allObjs);
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function saveUser(req, res) {
    try {
        const { fullname, ci, address, phoneNumber } = req.body;
        if (await user_models_1.UserModel.findOne({ 'personal_info.full_name': fullname })) {
            return (0, send_res_1.badResponse)(res, 'user_mess_7');
        }
        const password = ci.substring(6);
        const username = `${fullname.split(' ')[0].toLowerCase()}${ci.substring(0, 2)}`;
        const hashPassword = bcrypt_1.default.hashSync(password, 10);
        const commercial_code = (0, uuid_1.v4)().split('-')[0].toLocaleUpperCase();
        const user = new user_models_1.UserModel({
            username,
            password: hashPassword,
            personal_info: {
                ci: ci,
                full_name: fullname,
                address: address,
                phone: phoneNumber
            },
            role: 'commercial',
            commercial_code
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
            commercialCode: user.commercial_code,
            info: {
                ci: user.personal_info.ci,
                full_name: user.personal_info.full_name,
                phone: user.personal_info.phone,
                address: user.personal_info.address
            },
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
async function changePassword(req, res) {
    try {
        const { actualPass } = req.body;
        let { newPass } = req.body;
        const existingUser = await user_models_1.UserModel.findOne({ _id: res['userData']['user_id'] })
            .select('password');
        bcrypt_1.default.compare(actualPass, existingUser.password, async (err, result) => {
            if (!result) {
                return (0, send_res_1.badResponse)(res, 'user_mess_12', '');
            }
            if (err) {
                return (0, send_res_1.badResponse)(res, 'user_mess_12', '');
            }
            newPass = await bcrypt_1.default.hash(newPass, 10);
            user_models_1.UserModel.updateOne({ _id: res['userData']['user_id'] }, { $set: { password: newPass } })
                .then(() => { return (0, send_res_1.goodResponse)(res, 'user_mess_11'); })
                .catch((err) => { return (0, send_res_1.badResponse)(res, 'user_mess_12', err); });
        });
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
    getCommisionByCommercial,
    deleteUserById,
    editUserEnable,
    changePassword,
    resetPassword,
    getUserById,
    getAllUsers,
    saveUser,
    sign
};
//# sourceMappingURL=user.controller.js.map