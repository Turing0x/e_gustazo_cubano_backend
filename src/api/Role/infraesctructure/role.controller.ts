import { Response, Request } from 'express';

import { RoleModel } from '../domain/role.models';
import { goodResponse, badResponse } from '../../../helpers/send.res';
import { Role } from '../models/role.model';

async function saveRole(req: Request, res: Response) {
  try {

    const role: Role = req.body
    const newRole = new RoleModel(role);

    await newRole.save();
    
    return goodResponse(res, 'role_mess_1', '')

  } catch (error) { return badResponse(res, 'mess_0', error.message) }
}

export const RoleControllers = {
  saveRole
}