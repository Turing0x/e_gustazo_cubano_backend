import express from 'express';
export const api = express.Router();

import COLLECTIONS from '../helpers/collections';

import { UserRouter } from '../api/User/user.router';
import { ProductRouter } from '../api/Product/product.router';

api.use(`/${COLLECTIONS.USERS}`, UserRouter)
api.use(`/${COLLECTIONS.PRODUCTS}`, ProductRouter)
