import { Router } from 'express';

import { CoinControllers } from './infraesctructure/category.controller';
import { checkAuth } from '../../helpers/checkAuth';

const router = Router()

router

  .get('/', checkAuth, CoinControllers.getAllCategories)

  .put('/', checkAuth, CoinControllers.editCategory)

  .post('/', checkAuth, CoinControllers.saveCategory)

export const CategoryRouter = router
