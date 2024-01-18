"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const uuid_1 = require("uuid");
const order_models_1 = require("../domain/order.models");
const product_models_1 = require("../../Product/domain/product.models");
const send_res_1 = require("../../../helpers/send.res");
async function getAllOrders(req, res) {
    try {
        const { date } = req.params;
        const formatedDate = convertDate(date);
        const orders = (await order_models_1.OrderModel.find()).filter(order => (order.finish === true) && (order.date.split(' ')[0] === formatedDate));
        return (0, send_res_1.goodResponse)(res, 'crud_mess_0', orders);
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function getAllRequested(req, res) {
    try {
        const { date } = req.params;
        const formatedDate = convertDate(date);
        const orders = (await order_models_1.OrderModel.find()).filter(order => (order.finish === false) && (order.date.split(' ')[0] === formatedDate));
        return (0, send_res_1.goodResponse)(res, 'crud_mess_0', orders);
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function getRequestedByCommercial(req, res) {
    try {
        const { date, commercialCode } = req.params;
        const formatedDate = convertDate(date);
        const orders = (await order_models_1.OrderModel.find({ 'seller.commercial_code': commercialCode })).filter(order => (order.finish === false) && (order.date.split(' ')[0] === formatedDate));
        return (0, send_res_1.goodResponse)(res, 'crud_mess_0', orders);
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function getOrdersByCommercial(req, res) {
    try {
        const { date, commercialCode } = req.params;
        const formatedDate = convertDate(date);
        const orders = (await order_models_1.OrderModel.find({ 'seller.commercial_code': commercialCode })).filter(order => (order.finish === true) && (order.date.split(' ')[0] === formatedDate));
        return (0, send_res_1.goodResponse)(res, 'crud_mess_0', orders);
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function getOrderById(req, res) {
    try {
        const { orderId } = req.params;
        if (!orderId)
            return (0, send_res_1.badResponse)(res, 'order_mess_7');
        const order = await order_models_1.OrderModel.findById(orderId);
        if (!order)
            return (0, send_res_1.badResponse)(res, 'order_mess_7');
        return (0, send_res_1.goodResponse)(res, 'crud_mess_0', order);
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'order_mess_7', error.message);
    }
}
async function getOrderByPendingNumber(req, res) {
    try {
        const { pendingNumber } = req.params;
        if (!pendingNumber)
            return (0, send_res_1.badResponse)(res, 'order_mess_7');
        const order = await order_models_1.OrderModel.findOne({ pending_number: pendingNumber });
        if (!order)
            return (0, send_res_1.badResponse)(res, 'order_mess_7');
        return (0, send_res_1.goodResponse)(res, 'crud_mess_0', order);
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'order_mess_7', error.message);
    }
}
async function saveOrder(req, res) {
    try {
        const { date, product_list, total_amount, commission, seller, buyer } = req.body;
        const pending_number = (0, uuid_1.v4)().split('-')[0].substring(0, 4).toLocaleUpperCase();
        const Order = new order_models_1.OrderModel({
            date,
            pending_number,
            product_list,
            total_amount,
            commission,
            seller,
            buyer
        });
        await Order.save();
        await subtractStockOfProducts(product_list);
        return (0, send_res_1.goodResponse)(res, 'order_mess_1');
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'order_mess_2');
    }
}
async function markAsFinished(req, res) {
    try {
        const { orderId, invoiceNumber: invoice_number } = req.params;
        await order_models_1.OrderModel.findOneAndUpdate({ _id: orderId }, {
            $set: { finish: true, invoice_number }
        });
        return (0, send_res_1.goodResponse)(res, 'order_mess_8');
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0');
    }
}
async function editProductList(req, res) {
    try {
        const { product_list } = req.body;
        const orderId = req.params.orderId;
        await order_models_1.OrderModel.findOneAndUpdate({ _id: orderId }, {
            $set: { product_list }
        });
        return (0, send_res_1.goodResponse)(res, 'order_mess_9');
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function deleteOrderById(req, res) {
    try {
        const { orderId } = req.params;
        if (!orderId)
            return (0, send_res_1.badResponse)(res, 'order_mess_7');
        const getter = await order_models_1.OrderModel.findById(orderId);
        await order_models_1.OrderModel.deleteOne({ _id: orderId });
        await addStockOfProducts(getter.product_list);
        return (0, send_res_1.goodResponse)(res, 'order_mess_5', '');
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'order_mess_6', error.message);
    }
}
async function subtractStockOfProducts(product_list) {
    for (const product of product_list) {
        const getter = await product_models_1.ProductModel.findById(product['_id']);
        if (getter) {
            await product_models_1.ProductModel.findByIdAndUpdate(product['_id'], { $set: { in_stock: getter.in_stock - product['cantToBuy'] } });
        }
    }
}
async function addStockOfProducts(product_list) {
    for (const product of product_list) {
        const getter = await product_models_1.ProductModel.findById(product['_id']);
        if (getter) {
            await product_models_1.ProductModel.findByIdAndUpdate(product['_id'], { $set: { in_stock: getter.in_stock + product['cantToBuy'] } });
        }
    }
}
function convertDate(incomingDate) {
    const anio = new Date().getFullYear();
    // Crear un objeto Date con la fecha y el año
    const fechaObj = new Date(`${incomingDate}, ${anio}`);
    // Obtener el año, el mes y el día
    const anioStr = fechaObj.getFullYear().toString();
    const mesStr = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
    const diaStr = fechaObj.getDate().toString().padStart(2, '0');
    return `${anioStr}-${mesStr}-${diaStr}`;
}
exports.OrderControllers = {
    getRequestedByCommercial,
    getOrderByPendingNumber,
    getOrdersByCommercial,
    editProductList,
    deleteOrderById,
    getAllRequested,
    markAsFinished,
    getAllOrders,
    getOrderById,
    saveOrder
};
//# sourceMappingURL=order.controller.js.map