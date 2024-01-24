"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = __importDefault(require("express"));
exports.api = express_1.default.Router();
const collections_1 = __importDefault(require("../helpers/collections"));
const user_router_1 = require("../api/User/user.router");
const product_router_1 = require("../api/Product/product.router");
const order_router_1 = require("../api/Order/order.router");
const coin_router_1 = require("../api/Coin/coin.router");
exports.api.use(`/${collections_1.default.USERS}`, user_router_1.UserRouter);
exports.api.use(`/${collections_1.default.PRODUCTS}`, product_router_1.ProductRouter);
exports.api.use(`/${collections_1.default.ORDER}`, order_router_1.OrderRouter);
exports.api.use(`/${collections_1.default.COIN}`, coin_router_1.CoinRouter);
//# sourceMappingURL=index.routes.js.map