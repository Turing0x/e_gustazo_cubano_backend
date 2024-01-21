import { Router } from 'express';

import { ProductControllers } from './infraesctructure/product.controller';
import { checkAuth } from '../../helpers/checkAuth';

const router = Router()

router

  .get('/', checkAuth, ProductControllers.getAllProducts)
  .get('/:productId', checkAuth, ProductControllers.getProductById)

  .post('/', checkAuth, ProductControllers.saveProduct)

  .put('/:productId', checkAuth, ProductControllers.editProduct)

  .delete('/:productId', checkAuth, ProductControllers.deleteProductById)

export const ProductRouter = router
