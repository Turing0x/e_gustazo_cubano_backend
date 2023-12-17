import { Router } from 'express';

import { ProductControllers } from './infraesctructure/product.controller';

const router = Router()

router

  .get('/', ProductControllers.getAllProducts)
  .get('/:productId', ProductControllers.getProductById)

  .post('/', ProductControllers.saveProduct)

  .put('/:productId', ProductControllers.editProduct)

  .delete('/:productId', ProductControllers.deleteProductById)

export const ProductRouter = router
