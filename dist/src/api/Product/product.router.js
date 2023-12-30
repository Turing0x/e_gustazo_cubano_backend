"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = require("express");
const product_controller_1 = require("./infraesctructure/product.controller");
const router = (0, express_1.Router)();
router
    .get('/', product_controller_1.ProductControllers.getAllProducts)
    .get('/:productId', product_controller_1.ProductControllers.getProductById)
    .post('/', product_controller_1.ProductControllers.saveProduct)
    .put('/:productId', product_controller_1.ProductControllers.editProduct)
    .delete('/:productId', product_controller_1.ProductControllers.deleteProductById);
exports.ProductRouter = router;
//# sourceMappingURL=product.router.js.map