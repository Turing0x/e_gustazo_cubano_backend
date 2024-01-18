import { Router } from 'express';

import { UserControllers } from './infraesctructure/user.controller';

const router = Router()

router

  .get('/', UserControllers.getAllUsers)
  .get('/:userId', UserControllers.getUserById)
  .get('/orders/:userId', UserControllers.getCommisionByCommercial)

  .post('/', UserControllers.saveUser)
  .post('/signin', UserControllers.sign)
  .post('/resetpass', UserControllers.resetPassword)

  .put('/changeEnable/:id', UserControllers.editUserEnable)

  .delete('/:userId', UserControllers.deleteUserById)
export const UserRouter = router
