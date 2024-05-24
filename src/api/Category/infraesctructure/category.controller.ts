import { Response, Request } from 'express';

import { CategoryModel } from '../domain/category.models';
import { goodResponse, badResponse } from '../../../helpers/send.res';

async function getAllCategories(req: Request, res: Response) {
  try {
    const coins = await CategoryModel.find();
    return goodResponse(res, 'crud_mess_0', coins)
  } catch (error) { return badResponse(res, 'mess_0', error.message) }
}

async function saveCategory(req: Request, res: Response) {
  
  try {
    
    const list = req.body;

    for (const cat of list) {
      
      const { name, subcategory } = cat;
      const Coin = new CategoryModel({
        name,
        subcategory,
      });
      
      await Coin.save();

    }
    
    return goodResponse(res, 'cat_mess_1');
    
  } catch (error) { return badResponse(res, 'cat_mess_2') }
  
}

async function editCategory(req: Request, res: Response) {
  
  try {
    
    const { subcategory } = req.body;
    const catId = req.params.catId

    await CategoryModel.findOneAndUpdate({ _id: catId }, {
      $push: {subcategory}
    })
    
    return goodResponse(res, 'cat_mess_1');
    
  } catch (error) { return badResponse(res, 'cat_mess_2') }
  
}

export const CoinControllers = {
  getAllCategories,
  editCategory,
  saveCategory
}