"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = require("express");
const order_controller_1 = require("./infraesctructure/order.controller");
const checkAuth_1 = require("../../helpers/checkAuth");
const router = (0, express_1.Router)();
router
    .get('/:date', checkAuth_1.checkAuth, order_controller_1.OrderControllers.getAllOrders)
    .get('/getById/:orderId', checkAuth_1.checkAuth, order_controller_1.OrderControllers.getOrderById)
    .get('/pending/:date', checkAuth_1.checkAuth, order_controller_1.OrderControllers.getAllRequested)
    .get('/getDaily/:date', checkAuth_1.checkAuth, order_controller_1.OrderControllers.getDailyResume)
    .get('/getByComm/:commercialCode/:date', checkAuth_1.checkAuth, order_controller_1.OrderControllers.getRequestedByCommercial)
    .get('/getByCommOrder/:commercialCode/:date', checkAuth_1.checkAuth, order_controller_1.OrderControllers.getOrdersByCommercial)
    .post('/', checkAuth_1.checkAuth, order_controller_1.OrderControllers.saveOrder)
    .put('/:orderId', checkAuth_1.checkAuth, order_controller_1.OrderControllers.editProductList)
    .put('/:orderId/:invoiceNumber', checkAuth_1.checkAuth, order_controller_1.OrderControllers.markAsFinished)
    .delete('/:orderId', checkAuth_1.checkAuth, order_controller_1.OrderControllers.deleteOrderById);
exports.OrderRouter = router;
//# sourceMappingURL=order.router.js.map