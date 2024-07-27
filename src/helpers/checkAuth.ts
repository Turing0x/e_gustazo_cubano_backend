import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';
import { badResponse } from './send.res';

export async function checkAuth(req: CustomRequest, res: Response, next: NextFunction) {

  try {

    const token: string = req.headers['access-token'] as string;
    if (!token) return badResponse(res, 'server_mess_5');

    const { username, id, entity } = jwt.verify(token, (process.env.JWT_KEY_APP || '')
      ) as { id: string, username: string, entity: string };

    req.userData = { id, username, entity };

    return next();

  } catch (error) {
    return badResponse(res, 'server_mess_5');
  }
}

export interface CustomRequest extends Request {
  id?: string; username?: string;
}
  
declare module 'express' {
  interface Request {
    userData?: {
      id: string;
      username: string;
      entity: string;
    };
  }
}