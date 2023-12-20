import { Response, Request } from 'express';

import { OrderModel } from '../domain/order.models';
import { goodResponse, badResponse } from '../../../helpers/send.res';

async function getAllOrders(req: Request, res: Response) {
  const orders = (await OrderModel.find()).filter(order => 
    order.finish === true);
  return goodResponse(res, 'crud_mess_0', orders)
}

async function getAllRequested(req: Request, res: Response) {
  const orders = (await OrderModel.find()).filter(order => 
    order.finish === false);
  return goodResponse(res, 'crud_mess_0', orders)
}

async function getOrderById (req: Request, res: Response) {
  
  const { orderId } = req.params;
  if( !orderId ) return badResponse(res, 'mess_1'); 

  const order = await OrderModel.findById(orderId);
  if (!order) return badResponse(res, 'crud_mess_8'); 
  
  return goodResponse(res, 'crud_mess_0', order);

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
  
    return goodResponse(res, 'crud_mess_1');
    
  } catch (error) { return badResponse(res, 'mess_0') }

}

async function markAsFinished(req: Request, res: Response) {

  try {
    
    const { orderId, invoice_number } = req.params

    await OrderModel.findOneAndUpdate({ _id: orderId }, {
      $set: { finish: true, invoice_number }
    })

    return goodResponse(res, 'crud_mess_3_0')
    
  } catch (error) { return badResponse(res, 'mess_0') }

}

async function deleteOrderById (req: Request, res: Response) {
  
  const { orderId } = req.params;
  if( !orderId ) return badResponse(res, 'mess_1'); 

  await OrderModel.deleteOne({ _id: orderId })
  
  return goodResponse(res, 'crud_mess_5', '');

}

export const OrderControllers = {
  deleteOrderById,
  getAllRequested,
  markAsFinished,
  getAllOrders,
  getOrderById,
  saveOrder
}