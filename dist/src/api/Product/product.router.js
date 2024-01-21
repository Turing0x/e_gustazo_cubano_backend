"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = require("express");
const product_controller_1 = require("./infraesctructure/product.controller");
const checkAuth_1 = require("../../helpers/checkAuth");
const router = (0, express_1.Router)();
router
    .get('/', checkAuth_1.checkAuth, product_controller_1.ProductControllers.getAllProducts)
    .get('/:productId', checkAuth_1.checkAuth, product_controller_1.ProductControllers.getProductById)
    .post('/', checkAuth_1.checkAuth, product_controller_1.ProductControllers.saveProduct)
    .put('/:productId', checkAuth_1.checkAuth, product_controller_1.ProductControllers.editProduct)
    .delete('/:productId', checkAuth_1.checkAuth, product_controller_1.ProductControllers.deleteProductById);
exports.ProductRouter = router;
//# sourceMappingURL=product.router.js.map