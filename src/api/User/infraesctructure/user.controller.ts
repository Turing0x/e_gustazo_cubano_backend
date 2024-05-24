import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

import { UserModel } from '../domain/user.models';
import { OrderModel } from '../../Order/domain/order.models';
import { goodResponse, badResponse } from '../../../helpers/send.res';

async function getAllUsers(req: Request, res: Response) {

  try {
    const users = (await UserModel.find({role: 'commercial'}))
    return goodResponse(res, 'crud_mess_0', users)
  } catch (error) { return badResponse(res, 'mess_0', error.message) }

}

async function getUserById (req: Request, res: Response) {
  
  try {
    
    const { userId } = req.params;
    if( !userId ) return badResponse(res, 'mess_1'); 
  
    const user = await UserModel.findById(userId);
    if (!user) return badResponse(res, 'user_mess_8'); 
    
    return goodResponse(res, 'crud_mess_0', user);

  } catch (error) { return badResponse(res, 'mess_0', error.message) }

}

async function getCommisionByCommercial(req: Request, res: Response) {

  try {

    const commisionData = new Map()
    const allObjs = []

    const { userId } = req.params;
    if( !userId ) return badResponse(res, 'mess_1'); 
  
    const user = await UserModel.findById(userId);
    if (!user) return badResponse(res, 'user_mess_8'); 

    const hisOrders = await OrderModel.find({
      'seller.commercialCode': user.commercial_code
    }).lean()

    for (const order of hisOrders) {

      order.product_list.forEach(product => {
        
        const id = product['_id']

        if (!commisionData.has(id)) {
          commisionData.set(id, {
            name: product['name'],
            price: product['price'],
            commission: product['commission'],
            cantToBuy: product['cantToBuy'],
            date: order.date
          })
        } else {
          commisionData.get(id).cantToBuy += product['cantToBuy']
        }

      })
    }

    allObjs.push(Object.fromEntries(commisionData))

    return goodResponse(res, 'crud_mess_0', allObjs);
    
  } catch (error) { return badResponse(res, 'mess_0', error.message) }
  
}

async function saveUser(req: Request, res: Response) {
  
  try {

    const { full_name, ci, address, phone } = req.body;
  
    if (await UserModel.findOne({ 'personal_info.full_name': full_name })) {
      return badResponse(res, 'user_mess_7');
    }

    const password = ci.substring(6)
    const username = `${full_name.split(' ')[0].toLowerCase()}${ci.substring(0, 2)}`

    const hashPassword = bcrypt.hashSync(password, 10);
    const commercial_code: string = uuidv4().split('-')[0].toLocaleUpperCase()
  
    const user = new UserModel({
      username,
      password: hashPassword,
      personal_info: {
        ci: ci,
        full_name,
        address: address,
        phone
      },
      role: 'commercial',
      commercial_code
    });
  
    await user.save();
  
    return goodResponse(res, 'user_mess_1');
    
  } catch (error) {
    console.log(error);
    return badResponse(res, 'mess_0', error.message)
  }

}

async function sign(req: Request, res: Response) {

  try {

    const { username, password } = req.body;
  
    const user = await UserModel.findOne({ username });
    if (!user) return badResponse(res, 'user_mess_8');
    
    const compare = bcrypt.compareSync(password, user.password);
    if (!compare) return badResponse(res, 'server_mess_4');
  
    const token = jwt.sign(
      { username: user.username, user_id: user._id, enable: user.enable },
      process.env.JWT_KEY_APP,
      { expiresIn: '7d' }
    )
  
    return goodResponse(res, 'server_mess_3', {
      user: {
        userID: user._id,
        commercialCode: user.commercial_code,
        info: {
          ci: user.personal_info.ci,
          full_name: user.personal_info.full_name,
          phone: user.personal_info.phone,
          address: user.personal_info.address
        } ,
        role: user.role.toLocaleLowerCase()
      },
      token,
    });
    
  } catch (error) { return badResponse(res, 'mess_0', error.message) }

}

async function editUserEnable(req: Request, res: Response) {
  
  try {

    const { enable } = req.body
    const id = req.params.id

    await UserModel.findOneAndUpdate({ _id: id }, {
      $set: {enable}
    })

    return goodResponse(res, 'user_mess_3')

  } catch (error) { return badResponse(res, 'mess_0', error.message) }

}

async function editUser(req: Request, res: Response) {
  
  try {
    
    const { full_name, ci, address, phone } = req.body;
    const { userId } = req.params;
  
    const product = await UserModel.findById(userId)
    if (!product) return badResponse(res, 'product_mess_8'); 
    
    const user_obj = {
      personal_info: {
        full_name: full_name ?? product.personal_info.full_name,
        ci: ci ?? product.personal_info.ci,
        address: address ?? product.personal_info.address,
        phone: phone ?? product.personal_info.phone,
      }
    };
  
    await UserModel.findByIdAndUpdate(userId, user_obj)
  
    return goodResponse(res, 'user_mess_3');
    
  } catch (error) { return badResponse(res, 'user_mess_4', error.message) }

}

async function resetPassword(req: Request, res: Response) {

  try {

    const { userId } = req.query

    const password = await bcrypt.hash('0000', 10)

    UserModel.updateOne({_id: userId}, { $set: { password } })
      .then(() => { return goodResponse(res, 'user_mess_9') })
      .catch((err) => { return badResponse(res, 'user_mess_10', err.message) })

  } catch (error) { return badResponse(res, 'mess_0', error.message) }

}

async function changePassword(req: Request, res: Response) {

  try {

    const { actualPass } = req.body
    let { newPass } = req.body
    const existingUser = await UserModel.findOne({ _id: res['userData']['user_id'] })
      .select('password')

    bcrypt.compare(actualPass, existingUser.password, async (err, result) => {
      if (!result) { return badResponse(res, 'user_mess_12', '') }

      if (err) { return badResponse(res, 'user_mess_12', '') }

      newPass = await bcrypt.hash(newPass, 10)

      UserModel.updateOne({ _id: res['userData']['user_id'] }, { $set: { password: newPass } })
        .then(() => { return goodResponse(res, 'user_mess_11') })
        .catch((err) => { return badResponse(res, 'user_mess_12', err) })
    })

  } catch (error) {
    return badResponse(res, 'mess_0', error.message)
  }

}

async function deleteUserById(req: Request, res: Response) {
  
  try {
    
    const { userId } = req.params;
    if( !userId ) return badResponse(res, 'mess_1'); 
  
    await UserModel.deleteOne({ _id: userId })
    
    return goodResponse(res, 'user_mess_5', '');

  } catch (error) { return badResponse(res, 'mess_0', error.message) }

}

async function tokenVerify(req: Request, res: Response) {
  
  try {

    const token: string = req.headers['access-token'] as string
    const decoded = jwt.verify(token, process.env.JWT_KEY_APP) as object

    const user = await UserModel.findOne({ username: decoded['username'] });
    const newToken = jwt.sign(
      { username: user.username, user_id: user._id, enable: user.enable },
      process.env.JWT_KEY_APP,
      { expiresIn: '7d' }
    )

    return goodResponse(res, 'server_mess_50', {
      user: {
        userID: user._id,
        commercialCode: user.commercial_code,
        info: {
          ci: user.personal_info.ci,
          full_name: user.personal_info.full_name,
          phone: user.personal_info.phone,
          address: user.personal_info.address
        } ,
        role: user.role.toLocaleLowerCase()
      },
      token: newToken,
    });

  } catch (error) { return badResponse(res, 'mess_0', error.message) }

}

export const UserControllers = {
  getCommisionByCommercial,
  deleteUserById,
  editUserEnable,
  changePassword,
  resetPassword,
  getUserById,
  getAllUsers,
  tokenVerify,
  editUser,
  saveUser,
  sign
}