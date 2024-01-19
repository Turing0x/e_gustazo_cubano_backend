"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: false
    },
    provider: {
        type: String,
        require: false
    },
    photo: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: false,
    },
    in_stock: {
        type: Number,
        require: true,
    },
    commission: {
        type: Number,
        require: true,
    },
    more_than: {
        type: Number,
        require: false,
    },
    discount: {
        type: Number,
        require: false,
    }
});
exports.ProductModel = mongoose_1.default.model('products', ProductSchema);
//# sourceMappingURL=product.models.js.map