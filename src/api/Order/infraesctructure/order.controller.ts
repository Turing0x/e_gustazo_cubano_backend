import { Response, Request } from 'express';

import { OrderModel } from '../domain/order.models';
import { ProductModel } from '../../Product/domain/product.models';
import { goodResponse, badResponse } from '../../../helpers/send.res';
import { Order } from '../models/order.model';

async function getAllOrders(req: Request, res: Response) {
  try {

    const { date } = req.params
    const formatedDate = convertDate(date);

    const orders = (await OrderModel.find()).filter(
      order => order.date.split(' ')[0] === formatedDate);
    
    return goodResponse(res, 'crud_mess_0', orders)

  } catch (error) { return badResponse(res, 'mess_0', error.message) }
}

async function getAllRequested(req: Request, res: Response) {
  try {

    const { date } = req.params
    const formatedDate = convertDate(date);

    const orders = (await OrderModel.find()).filter(order =>
      order.date.split(' ')[0] === formatedDate);
    
    return goodResponse(res, 'crud_mess_0', orders)
  } catch (error) { return badResponse(res, 'mess_0', error.message) }
}

async function getRequestedByCommercial(req: Request, res: Response) {
  try {

    const { date, owner_id } = req.params
    const formatedDate = convertDate(date);

    const orders = (await OrderModel.find({ owner: owner_id })).filter(order =>
      order.date.split(' ')[0] === formatedDate);
    
    return goodResponse(res, 'crud_mess_0', orders)
  } catch (error) { return badResponse(res, 'mess_0', error.message) }
}

async function getOrdersByCommercial(req: Request, res: Response) {
  try {

    const { date, owner_id } = req.params
    const formatedDate = convertDate(date);

    const orders = (await OrderModel.find({ owner: owner_id })).filter(order =>
      order.date.split(' ')[0] === formatedDate);
    
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

async function getDailyResume(req: Request, res: Response) {
  
  try {

    // const { date } = req.params;
    // const formatedDate = convertDate(date);

    // const map = new Map()
    // const list = []

    // const orders = (await OrderModel.find()).filter(
    //   order => (order.finish === true) &&
    //             (order.date.split(' ')[0] === formatedDate)
    // );

    // orders.forEach(order => {
    //   for (const prod of order.product_list) {
    //     if (!map.has(prod._id)) {
    //       map.set(prod._id, {
    //         _id: prod._id,
    //         name: prod.name,
    //         provider: prod.provider,
    //         price: prod.price,
    //         more_than: prod.more_than,
    //         discount: prod.discount,
    //         cantToBuy: prod.cantToBuy
    //       });
    //     } else {
    //       const finalcantToBuy = map.get(prod._id).cantToBuy + prod.cantToBuy;
    //       map.set(prod._id, {
    //         _id: prod._id,
    //         name: prod.name,
    //         provider: prod.provider,
    //         price: prod.price,
    //         more_than: prod.more_than,
    //         discount: prod.discount,
    //         cantToBuy: finalcantToBuy
    //       });
    //     }
    //   }
    // });

    // for (const val of map.values()) {
    //   list.push(val);
    // }
    
    return goodResponse(res, 'crud_mess_0', 'list');
    
  } catch (error) { return badResponse(res, 'order_mess_7', error.message) }

}

async function saveOrder(req: Request, res: Response) {
  
  try {
    
    const order: Order = req.body;
    const Order = new OrderModel(order);

    await Order.save();
    await subtractStockOfProducts(order.product);
  
    return goodResponse(res, 'order_mess_1');
    
  } catch (error) { return badResponse(res, 'order_mess_2') }

}

async function deleteOrderById(req: Request, res: Response) {
  
  try {

    const { orderId } = req.params;
    if( !orderId ) return badResponse(res, 'order_mess_7'); 

    const getter = await OrderModel.findById(orderId);
    
    await OrderModel.deleteOne({_id: orderId});
    await addStockOfProducts(getter.product)
    
    return goodResponse(res, 'order_mess_5', '');
    
  } catch (error) { return badResponse(res, 'order_mess_6', error.message) }

}

async function subtractStockOfProducts(prod: object) {
  const getter = await ProductModel.findById(prod['_id']);
  await ProductModel.findByIdAndUpdate(prod['_id'],
    { $set: { in_stock: getter.in_stock - prod['cantToBuy'] } },
  );
}

async function addStockOfProducts(prod: object) {
  const getter = await ProductModel.findById(prod['_id']);
  await ProductModel.findByIdAndUpdate(prod['_id'],
    { $set: { in_stock: getter.in_stock - prod['cantToBuy'] } },
  );
}

function convertDate(incomingDate: string): string {
  const anio = new Date().getFullYear();

  // Crear un objeto Date con la fecha y el año
  const fechaObj = new Date(`${incomingDate}, ${anio}`);

  // Obtener el año, el mes y el día
  const anioStr = fechaObj.getFullYear().toString();
  const mesStr = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
  const diaStr = fechaObj.getDate().toString().padStart(2, '0');

  return `${anioStr}-${mesStr}-${diaStr}`;
}

export const OrderControllers = {
  getRequestedByCommercial,
  getOrdersByCommercial,
  deleteOrderById,
  getAllRequested,
  getDailyResume,
  getAllOrders,
  getOrderById,
  saveOrder
}