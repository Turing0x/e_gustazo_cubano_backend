"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = require("express");
const order_controller_1 = require("./infraesctructure/order.controller");
const router = (0, express_1.Router)();
router
    .get('/:date', order_controller_1.OrderControllers.getAllOrders)
    .get('/getById/:orderId', order_controller_1.OrderControllers.getOrderById)
    .get('/pending/:date', order_controller_1.OrderControllers.getAllRequested)
    .get('/getByComm/:referalCode/:date', order_controller_1.OrderControllers.getRequestedByCommercial)
    .get('/getByCommOrder/:referalCode/:date', order_controller_1.OrderControllers.getOrdersByCommercial)
    .post('/', order_controller_1.OrderControllers.saveOrder)
    .put('/:orderId', order_controller_1.OrderControllers.editProductList)
    .put('/:orderId/:invoiceNumber', order_controller_1.OrderControllers.markAsFinished)
    .delete('/:orderId', order_controller_1.OrderControllers.deleteOrderById);
exports.OrderRouter = router;
//# sourceMappingURL=order.router.js.map