import { Router } from 'express';

import { CoinControllers } from './infraesctructure/coin.controller';
import { checkAuth } from '../../helpers/checkAuth';

const router = Router()

router

  .get('/', checkAuth, CoinControllers.getAllCoins)

  .post('/', checkAuth, CoinControllers.saveCoin)

export const CoinRouter = router
