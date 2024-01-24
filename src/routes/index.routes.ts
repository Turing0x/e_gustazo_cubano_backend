import express from 'express';
export const api = express.Router();

import COLLECTIONS from '../helpers/collections';

import { UserRouter } from '../api/User/user.router';
import { ProductRouter } from '../api/Product/product.router';
import { OrderRouter } from '../api/Order/order.router';
import { CoinRouter } from '../api/Coin/coin.router';

api.use(`/${COLLECTIONS.USERS}`, UserRouter)
api.use(`/${COLLECTIONS.PRODUCTS}`, ProductRouter)
api.use(`/${COLLECTIONS.ORDER}`, OrderRouter)
api.use(`/${COLLECTIONS.COIN}`, CoinRouter)
