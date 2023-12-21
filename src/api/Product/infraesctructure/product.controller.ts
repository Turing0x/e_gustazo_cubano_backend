import { Response, Request } from 'express';

import { ProductModel } from '../domain/product.models';
import { goodResponse, badResponse } from '../../../helpers/send.res';

async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await ProductModel.find();
    return goodResponse(res, 'crud_mess_0', products)
  } catch (error) { return badResponse(res, 'mess_0', error.message) }
}

async function getProductById(req: Request, res: Response) {
  
  try {

    const { productId } = req.params;
    if( !productId ) return badResponse(res, 'mess_1'); 

    const product = await ProductModel.findById(productId);
    if (!product) return badResponse(res, 'product_mess_8'); 
    
    return goodResponse(res, 'crud_mess_0', product);
    
  } catch (error) { return badResponse(res, 'mess_0', error.message) }

}

async function saveProduct(req: Request, res: Response) {
  
  try {

    const { name, description, photo, price, inStock, commission, discount, more_than } = req.body;
  
    const Product = new ProductModel({
      name,
      description,
      photo: photo ?? '',
      price,
      in_stock: inStock,
      commission,
      discount,
      more_than
    });
  
    await Product.save();
  
    return goodResponse(res, 'product_mess_1');

  } catch (error) { return badResponse(res, 'product_mess_2', error.message) }

}

async function editProduct(req: Request, res: Response) {
  
  try {
    
    const { name, description, photo, price, inStock, commission, discount, more_than } = req.body;
    const { productId } = req.params;
  
    const product = await ProductModel.findById(productId)
    if(!product) return badResponse(res, 'product_mess_8'); 
  
    const product_obj = {
      name: name ?? product.name,
      description: description ?? product.description,
      photo: photo ?? product.photo,
      price: price ?? product.price,
      in_stock: inStock ?? product.in_stock,
      commission: commission ?? product.commission,
      discount: discount ?? product.discount,
      more_than: more_than ?? product.more_than,
    };
  
    await ProductModel.findByIdAndUpdate(productId, product_obj)
  
    return goodResponse(res, 'product_mess_3');
    
  } catch (error) { return badResponse(res, 'product_mess_4', error.message) }

}

async function deleteProductById(req: Request, res: Response) {
  
  try {

    const { productId } = req.params;
    if( !productId ) return badResponse(res, 'product_mess_8'); 
  
    await ProductModel.deleteOne({ _id: productId })
    
    return goodResponse(res, 'product_mess_5', '');
    
  } catch (error) { return badResponse(res, 'product_mess_6', error.message) }

}

export const ProductControllers = {
  deleteProductById,
  getAllProducts,
  getProductById,
  saveProduct,
  editProduct,
}