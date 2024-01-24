"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinControllers = void 0;
const coin_models_1 = require("../domain/coin.models");
const send_res_1 = require("../../../helpers/send.res");
async function getAllCoins(req, res) {
    try {
        const coins = await coin_models_1.CoinModel.find();
        return (0, send_res_1.goodResponse)(res, 'crud_mess_0', coins);
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function saveCoin(req, res) {
    try {
        const { mlc, usd } = req.body;
        const getted = await coin_models_1.CoinModel.findOne();
        if (getted) {
            await coin_models_1.CoinModel.updateOne({ id: getted.id }, { $set: { mlc, usd } });
            return (0, send_res_1.goodResponse)(res, 'coin_mess_1');
        }
        const Coin = new coin_models_1.CoinModel({
            mlc,
            usd
        });
        await Coin.save();
        return (0, send_res_1.goodResponse)(res, 'coin_mess_1');
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'coin_mess_2');
    }
}
exports.CoinControllers = {
    getAllCoins,
    saveCoin
};
//# sourceMappingURL=coin.controller.js.map