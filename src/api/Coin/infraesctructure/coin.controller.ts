import { Response, Request } from 'express';

import { CoinModel } from '../domain/coin.models';
import { goodResponse, badResponse } from '../../../helpers/send.res';

async function getAllCoins(req: Request, res: Response) {
  try {
    const coins = await CoinModel.find();
    return goodResponse(res, 'crud_mess_0', coins)
  } catch (error) { return badResponse(res, 'mess_0', error.message) }
}

async function saveCoin(req: Request, res: Response) {
  
  try {
    
    const { mlc, usd, euro } = req.body;

    const getted = await CoinModel.findOne()
    if (getted) {
      
      await CoinModel.updateOne(
        { id: getted.id },
        {$set: {mlc, usd, euro}}
      )

      return goodResponse(res, 'coin_mess_1');
      
    }
    
    const Coin = new CoinModel({
      mlc,
      usd,
      euro
    });
    
    await Coin.save();
    
    return goodResponse(res, 'coin_mess_1');
    
  } catch (error) { return badResponse(res, 'coin_mess_2') }
  
}

export const CoinControllers = {
  getAllCoins,
  saveCoin
}