import { Router } from 'express';

import { OrderControllers } from './infraesctructure/order.controller';
import { checkAuth } from '../../helpers/checkAuth';

const router = Router()

router

  .get('/:date', checkAuth, OrderControllers.getAllOrders)
  .get('/getById/:orderId', checkAuth, OrderControllers.getOrderById)
  .get('/pending/:date', checkAuth, OrderControllers.getAllRequested)
  .get('/getByComm/:commercialCode/:date', checkAuth, OrderControllers.getRequestedByCommercial)
  .get('/getByCommOrder/:commercialCode/:date', checkAuth, OrderControllers.getOrdersByCommercial)

  .post('/', checkAuth, OrderControllers.saveOrder)

  .put('/:orderId', checkAuth, OrderControllers.editProductList)
  .put('/:orderId/:invoiceNumber', checkAuth, OrderControllers.markAsFinished)

  .delete('/:orderId', checkAuth, OrderControllers.deleteOrderById)

export const OrderRouter = router
