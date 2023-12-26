import { Response, Request } from 'express';

import { OrderModel } from '../domain/order.models';
import { ProductModel } from '../../Product/domain/product.models';
import { goodResponse, badResponse } from '../../../helpers/send.res';

async function getAllOrders(req: Request, res: Response) {
  try {

    const { date } = req.params
    const formatedDate = convertDate(date);

    const orders = (await OrderModel.find()).filter(order => 
      (order.finish === true) && (order.date.split(' ')[0] === formatedDate));
    
    return goodResponse(res, 'crud_mess_0', orders)

  } catch (error) { return badResponse(res, 'mess_0', error.message) }
}

async function getAllRequested(req: Request, res: Response) {
  try {

    const { date } = req.params
    const formatedDate = convertDate(date);

    const orders = (await OrderModel.find()).filter(order => 
      (order.finish === false) && (order.date.split(' ')[0] === formatedDate));
    
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
    
    const { date, product_list, total_amount, commission, seller } = req.body;

    const Order = new OrderModel({
      date,
      product_list,
      total_amount,
      commission,
      seller
    });

    await Order.save();
    await subtractStockOfProducts(product_list);
  
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

async function editProductList(req: Request, res: Response) {
  
  try {

    const { product_list } = req.body
    const orderId = req.params.orderId

    await OrderModel.findOneAndUpdate({ _id: orderId }, {
      $set: {product_list}
    })

    return goodResponse(res, 'order_mess_9')

  } catch (error) { return badResponse(res, 'mess_0', error.message) }

}

async function deleteOrderById(req: Request, res: Response) {
  
  try {

    const { orderId } = req.params;
    if( !orderId ) return badResponse(res, 'order_mess_7'); 

    const getter = await OrderModel.findById(orderId);
    
    await OrderModel.deleteOne({_id: orderId});
    await addStockOfProducts(getter.product_list as [object])
    
    return goodResponse(res, 'order_mess_5', '');
    
  } catch (error) { return badResponse(res, 'order_mess_6', error.message) }

}

async function subtractStockOfProducts(product_list: [object]) {
  for (const product of product_list) {
    const getter = await ProductModel.findById(product['_id']);
    if (getter) {
      await ProductModel.findByIdAndUpdate(product['_id'],
        { $set: { in_stock: getter.in_stock - product['cantToBuy'] } },
      );
    } 
  }
}

async function addStockOfProducts(product_list: [object]) {
  for (const product of product_list) {
    const getter = await ProductModel.findById(product['producId']);
    if (getter) {
      await ProductModel.findByIdAndUpdate(product['producId'],
        { $set: { in_stock: getter.in_stock + product['cantToBuy'] } },
      );
    }
  }
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
  editProductList,
  deleteOrderById,
  getAllRequested,
  markAsFinished,
  getAllOrders,
  getOrderById,
  saveOrder
}