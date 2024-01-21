import { Router } from 'express';

import { UserControllers } from './infraesctructure/user.controller';
import { checkAuth } from '../../helpers/checkAuth';

const router = Router()

router

  .get('/', checkAuth, UserControllers.getAllUsers)
  .get('/:userId', checkAuth, UserControllers.getUserById)
  .get('/orders/:userId', checkAuth, UserControllers.getCommisionByCommercial)

  .post('/', checkAuth, UserControllers.saveUser)
  .post('/signin', UserControllers.sign)
  .post('/resetpass', checkAuth, UserControllers.resetPassword)
  .post('/changePassword', checkAuth, UserControllers.changePassword)

  .put('/changeEnable/:id', checkAuth, UserControllers.editUserEnable)

  .delete('/:userId', checkAuth, UserControllers.deleteUserById)
export const UserRouter = router
