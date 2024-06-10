import { Router } from 'express';

import { RoleControllers } from './infraesctructure/role.controller';
import { checkAuth } from '../../helpers/checkAuth';

const router = Router()

router

  .post('/', checkAuth, RoleControllers.saveRole)

export const RoleRouter = router
