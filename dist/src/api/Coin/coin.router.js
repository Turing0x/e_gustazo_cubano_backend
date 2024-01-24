"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinRouter = void 0;
const express_1 = require("express");
const coin_controller_1 = require("./infraesctructure/coin.controller");
const checkAuth_1 = require("../../helpers/checkAuth");
const router = (0, express_1.Router)();
router
    .get('/', checkAuth_1.checkAuth, coin_controller_1.CoinControllers.getAllCoins)
    .post('/', checkAuth_1.checkAuth, coin_controller_1.CoinControllers.saveCoin);
exports.CoinRouter = router;
//# sourceMappingURL=coin.router.js.map