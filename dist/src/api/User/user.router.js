"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./infraesctructure/user.controller");
const checkAuth_1 = require("../../helpers/checkAuth");
const router = (0, express_1.Router)();
router
    .get('/', checkAuth_1.checkAuth, user_controller_1.UserControllers.getAllUsers)
    .get('/:userId', checkAuth_1.checkAuth, user_controller_1.UserControllers.getUserById)
    .get('/orders/:userId', checkAuth_1.checkAuth, user_controller_1.UserControllers.getCommisionByCommercial)
    .post('/', checkAuth_1.checkAuth, user_controller_1.UserControllers.saveUser)
    .post('/signin', user_controller_1.UserControllers.sign)
    .post('/resetpass', checkAuth_1.checkAuth, user_controller_1.UserControllers.resetPassword)
    .post('/changePassword', checkAuth_1.checkAuth, user_controller_1.UserControllers.changePassword)
    .put('/changeEnable/:id', checkAuth_1.checkAuth, user_controller_1.UserControllers.editUserEnable)
    .delete('/:userId', checkAuth_1.checkAuth, user_controller_1.UserControllers.deleteUserById);
exports.UserRouter = router;
//# sourceMappingURL=user.router.js.map