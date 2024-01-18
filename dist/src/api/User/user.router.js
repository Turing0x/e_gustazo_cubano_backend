"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./infraesctructure/user.controller");
const router = (0, express_1.Router)();
router
    .get('/', user_controller_1.UserControllers.getAllUsers)
    .get('/:userId', user_controller_1.UserControllers.getUserById)
    .get('/orders/:userId', user_controller_1.UserControllers.getCommisionByCommercial)
    .post('/', user_controller_1.UserControllers.saveUser)
    .post('/signin', user_controller_1.UserControllers.sign)
    .post('/resetpass', user_controller_1.UserControllers.resetPassword)
    .put('/changeEnable/:id', user_controller_1.UserControllers.editUserEnable)
    .delete('/:userId', user_controller_1.UserControllers.deleteUserById);
exports.UserRouter = router;
//# sourceMappingURL=user.router.js.map