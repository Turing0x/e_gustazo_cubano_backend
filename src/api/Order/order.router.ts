import { Router } from 'express';

import { OrderControllers } from './infraesctructure/order.controller';

const router = Router()

router

  .get('/', OrderControllers.getAllOrders)
  .get('/pending', OrderControllers.getAllRequested)
  .get('/:orderId', OrderControllers.getOrderById)

  .post('/', OrderControllers.saveOrder)

  .put('/:orderId/:invoiceNumber', OrderControllers.markAsFinished)

  .delete('/:orderId', OrderControllers.deleteOrderById)

export const OrderRouter = router
