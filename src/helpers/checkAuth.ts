import jwt from 'jsonwebtoken';

import { UserModel } from '../api/User/domain/user.models';
import { badResponse } from './send.res';
import { Request, Response, NextFunction } from 'express-serve-static-core';

export async function checkAuth (req: Request, res: Response, next: NextFunction) {
  try {
    const token: string = req.headers['access-token'] as string
    const decoded = jwt.verify(token, process.env.JWT_KEY_APP) as object

    const { enable, role } = await UserModel.findOne({ _id: decoded['user_id'] })
      .select(['_id', 'username', 'enable', 'role'])
      .populate('role')

    if (enable) {
      res['userData'] = { role, ...decoded }
      return next()
    }

  } catch (error) { return badResponse(res, 'server_mess_5', error.message, 401) }
}
