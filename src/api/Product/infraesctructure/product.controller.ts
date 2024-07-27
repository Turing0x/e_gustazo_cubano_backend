import { Response, Request } from 'express';

import { ProductModel } from '../domain/product.models';
import { goodResponse, badResponse } from '../../../helpers/send.res';
import { Product } from '../models/product.model';

async function getAllProducts(req: Request, res: Response) {
  try {

    const products = (await ProductModel.find()
      .populate('category', 'name'))
      .filter( product => product.in_stock !== 0 );

    return goodResponse(res, 'crud_mess_0', products);
    
  } catch (error) { return badResponse(res, 'mess_0', error.message); }
}

async function getProductsToExibition(req: Request, res: Response) {
  try {
    const products = await ProductModel.find().populate(
      ['category', 'subcategory'])

    const cleanedProducts = []
    products.forEach(prod => {
      cleanedProducts.push({
        _id: prod._id,
        name: prod.name,
        provider: prod.provider,
        photo: prod.photo,
        price: prod.price,
        in_stock: prod.in_stock,
        category: prod.category,
      })
    });

    return goodResponse(res, 'crud_mess_0', cleanedProducts)
  } catch (error) { return badResponse(res, 'mess_0', error.message) }
}

async function getProductById(req: Request, res: Response) {
  
  try {

    const { productId } = req.params;
    if( !productId ) return badResponse(res, 'mess_1'); 

    const product = await ProductModel.findById(productId).populate(
      ['category', 'subcategory']);
    if (!product) return badResponse(res, 'product_mess_8'); 
    
    return goodResponse(res, 'crud_mess_0', product);
    
  } catch (error) { return badResponse(res, 'mess_0', error.message) }

}

async function saveProduct(req: Request, res: Response) {
  
  try {

    const prod: Product = req.body;
  
    const Product = new ProductModel(prod);
    await Product.save();

    return goodResponse(res, 'product_mess_1');

  } catch (error) {
    console.log(error);
    return badResponse(res, 'product_mess_2', error.message)
  }

}

async function editProduct(req: Request, res: Response) {
  
  try {
    
    const { name, description, provider, photo, sellType, box, weigth, category, subcategory,
      weigthType, price, coin, inStock: in_stock, commission, commissionDiscount,
      more_than, discount } = req.body;
    const { productId } = req.params;
  
    const product = await ProductModel.findById(productId)
    if (!product) return badResponse(res, 'product_mess_8'); 
    
    const product_obj = {
      name: name ?? product.name,
      sellType: sellType ?? product.sellType,
      box: box ?? product.box,
      weigth: weigth ?? product.weigth,
      weigthType: weigthType ?? product.weigthType,
      description: description ?? product.description,
      category: category ?? product.category,
      subcategory: subcategory ?? product.subcategory,
      provider: provider ?? product.provider,
      photo: photo ?? product.photo,
      price: price ?? product.price,
      coin: coin ?? product.coin,
      in_stock: in_stock ?? product.in_stock,
      commission: commission ?? product.commission,
      commissionDiscount: commissionDiscount ?? product.commissionDiscount,
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
  getProductsToExibition,
  deleteProductById,
  getAllProducts,
  getProductById,
  saveProduct,
  editProduct,
}