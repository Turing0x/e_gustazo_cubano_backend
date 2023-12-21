import { Response, Request } from 'express';

import { OrderModel } from '../domain/order.models';
import { goodResponse, badResponse } from '../../../helpers/send.res';

async function getAllOrders(req: Request, res: Response) {
  try {
    const orders = (await OrderModel.find()).filter(order => 
      order.finish === true);
    return goodResponse(res, 'crud_mess_0', orders)
  } catch (error) { return badResponse(res, 'mess_0', error.message) }
}

async function getAllRequested(req: Request, res: Response) {
  try {
    const orders = (await OrderModel.find()).filter(order => 
      order.finish === false);
    return goodResponse(res, 'crud_mess_0', orders)
  } catch (error) { return badResponse(res, 'mess_0', error.message) }
}

async function getOrderById(req: Request, res: Response) {
  
  try {

    const { orderId } = req.params;
    if( !orderId ) return badResponse(res, 'order_mess_7'); 
  
    const order = await OrderModel.findById(orderId);
    if (!order) return badResponse(res, 'order_mess_7'); 
    
    return goodResponse(res, 'crud_mess_0', order);
    
  } catch (error) { return badResponse(res, 'order_mess_7', error.message) }

}

async function saveOrder(req: Request, res: Response) {
  
  try {
    
    const { date, product_list, total_amount, commision, seller } = req.body;

    const Order = new OrderModel({
      date,
      product_list,
      total_amount,
      commision,
      seller
    });
  
    await Order.save();
  
    return goodResponse(res, 'order_mess_1');
    
  } catch (error) { return badResponse(res, 'order_mess_2') }

}

async function markAsFinished(req: Request, res: Response) {

  try {
    
    const { orderId, invoiceNumber: invoice_number } = req.params

    await OrderModel.findOneAndUpdate({ _id: orderId }, {
      $set: { finish: true, invoice_number }
    })

    return goodResponse(res, 'order_mess_8')
    
  } catch (error) { return badResponse(res, 'mess_0') }

}

async function deleteOrderById(req: Request, res: Response) {
  
  try {

    const { orderId } = req.params;
    if( !orderId ) return badResponse(res, 'order_mess_7'); 
  
    await OrderModel.deleteOne({ _id: orderId })
    
    return goodResponse(res, 'order_mess_5', '');
    
  } catch (error) { return badResponse(res, 'order_mess_6') }

}

export const OrderControllers = {
  deleteOrderById,
  getAllRequested,
  markAsFinished,
  getAllOrders,
  getOrderById,
  saveOrder
}