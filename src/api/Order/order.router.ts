import { Router } from 'express';

import { OrderControllers } from './infraesctructure/order.controller';

const router = Router()

router

  .get('/:date', OrderControllers.getAllOrders)
  .get('/getById/:orderId', OrderControllers.getOrderById)
  .get('/pending/:date', OrderControllers.getAllRequested)
  .get('/getByComm/:commercialCode/:date', OrderControllers.getRequestedByCommercial)
  .get('/getByCommOrder/:commercialCode/:date', OrderControllers.getOrdersByCommercial)

  .post('/', OrderControllers.saveOrder)

  .put('/:orderId', OrderControllers.editProductList)
  .put('/:orderId/:invoiceNumber', OrderControllers.markAsFinished)

  .delete('/:orderId', OrderControllers.deleteOrderById)

export const OrderRouter = router
