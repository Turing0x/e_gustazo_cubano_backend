"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const product_models_1 = require("../domain/product.models");
const send_res_1 = require("../../../helpers/send.res");
async function getAllProducts(req, res) {
    try {
        const products = (await product_models_1.ProductModel.find())
            .filter(product => product.in_stock !== 0);
        return (0, send_res_1.goodResponse)(res, 'crud_mess_0', products);
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function getProductById(req, res) {
    try {
        const { productId } = req.params;
        if (!productId)
            return (0, send_res_1.badResponse)(res, 'mess_1');
        const product = await product_models_1.ProductModel.findById(productId);
        if (!product)
            return (0, send_res_1.badResponse)(res, 'product_mess_8');
        return (0, send_res_1.goodResponse)(res, 'crud_mess_0', product);
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function saveProduct(req, res) {
    try {
        const { name, description, provider, photo, price, inStock: in_stock, commission, more_than, discount } = req.body;
        const Product = new product_models_1.ProductModel({
            name,
            description,
            provider,
            photo: photo ?? '',
            price,
            in_stock,
            commission,
            discount,
            more_than
        });
        await Product.save();
        return (0, send_res_1.goodResponse)(res, 'product_mess_1');
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'product_mess_2', error.message);
    }
}
async function editProduct(req, res) {
    try {
        const { name, description, provider, photo, price, inStock: in_stock, commission, more_than, discount } = req.body;
        const { productId } = req.params;
        const product = await product_models_1.ProductModel.findById(productId);
        if (!product)
            return (0, send_res_1.badResponse)(res, 'product_mess_8');
        const product_obj = {
            name: name ?? product.name,
            description: description ?? product.description,
            provider: provider ?? product.provider,
            photo: photo ?? product.photo,
            price: price ?? product.price,
            in_stock: in_stock ?? product.in_stock,
            commission: commission ?? product.commission,
            discount: discount ?? product.discount,
            more_than: more_than ?? product.more_than,
        };
        await product_models_1.ProductModel.findByIdAndUpdate(productId, product_obj);
        return (0, send_res_1.goodResponse)(res, 'product_mess_3');
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'product_mess_4', error.message);
    }
}
async function deleteProductById(req, res) {
    try {
        const { productId } = req.params;
        if (!productId)
            return (0, send_res_1.badResponse)(res, 'product_mess_8');
        await product_models_1.ProductModel.deleteOne({ _id: productId });
        return (0, send_res_1.goodResponse)(res, 'product_mess_5', '');
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'product_mess_6', error.message);
    }
}
exports.ProductControllers = {
    deleteProductById,
    getAllProducts,
    getProductById,
    saveProduct,
    editProduct,
};
//# sourceMappingURL=product.controller.js.map