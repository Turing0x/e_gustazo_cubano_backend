import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

import { UserModel } from '../domain/user.models';
import { goodResponse, badResponse } from '../../../helpers/send.res';

async function getAllUsers(req: Request, res: Response) {
  const users = (await UserModel.find())
    .filter(e => e.role !== 'ADMIN');
  return goodResponse(res, 'crud_mess_0', users)
}

async function getUserById (req: Request, res: Response) {
  
  const { userId } = req.params;
  if( !userId ) return badResponse(res, 'mess_1'); 

  const user = await UserModel.findById(userId);
  if (!user) return badResponse(res, 'crud_mess_8'); 
  
  return goodResponse(res, 'crud_mess_0', user);

}

async function saveUser (req: Request, res: Response) {
  
  const { username, password } = req.body;

  if (!username || !password)
    return badResponse(res, 'crud_mess_2');

  if (await UserModel.findOne({ username })) {
    return badResponse(res, 'crud_mess_7');
  }

  const hashPassword = bcrypt.hashSync(password, 10);
  const referal_code: string = uuidv4().split('-')[0].toLocaleUpperCase()

  const user = new UserModel({
    username,
    password: hashPassword,
    role: 'commercial',
    referal_code
  });

  await user.save();

  return goodResponse(res, 'crud_mess_1');

}

async function sign(req: Request, res: Response) {

  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });
  if (!user) return badResponse(res, 'server_mess_4');
  
  const compare = bcrypt.compareSync(password, user.password);
  if (!compare) return badResponse(res, 'server_mess_4');

  const token = jwt.sign(
    { username: user.username, user_id: user._id, enable: user.enable },
    process.env.JWT_KEY_APP,
    { expiresIn: '100m' }
  )

  return goodResponse(res, 'server_mess_3', {
    userID: user._id,
    token,
    role: user.role.toLocaleLowerCase()
  });

}

async function editUserEnable (req: Request, res: Response) {
  try {

    const { enable } = req.body
    const id = req.params.id

    await UserModel.findOneAndUpdate({ _id: id }, {
      $set: {enable}
    })

    return goodResponse(res, 'crud_mess_3_0')

  } catch (error) { return badResponse(res, 'mess_0', error.message) }

}

async function resetPassword(req: Request, res: Response) {
  try {

    const { userId } = req.query

    const password = await bcrypt.hash('0000', 10)

    UserModel.updateOne({_id: userId}, { $set: { password } })
      .then(() => { return goodResponse(res, 'reset_pass_1') })
      .catch((err) => { return badResponse(res, 'reset_pass_0', err.message) })

  } catch (error) { return badResponse(res, 'mess_0', error.message) }
}

async function deleteUserById (req: Request, res: Response) {
  
  const { userId } = req.params;
  if( !userId ) return badResponse(res, 'mess_1'); 

  await UserModel.deleteOne({ _id: userId })
  
  return goodResponse(res, 'crud_mess_5', '');

}

export const UserControllers = {
  deleteUserById,
  editUserEnable,
  resetPassword,
  getUserById,
  getAllUsers,
  saveUser,
  sign
}