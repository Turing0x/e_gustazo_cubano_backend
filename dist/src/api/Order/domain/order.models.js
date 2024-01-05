"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    finish: {
        type: Boolean,
        default: false
    },
    invoice_number: {
        type: String,
        require: false,
        default: ''
    },
    pending_number: {
        type: String,
        require: false,
        default: ''
    },
    date: {
        type: String,
        require: true
    },
    product_list: {
        type: Array,
        require: true
    },
    total_amount: {
        type: Number,
        require: false
    },
    commission: {
        type: Number,
        require: true,
    },
    seller: {
        type: Object,
        require: true,
    },
    buyer: {
        type: Object,
        require: true,
    }
});
exports.OrderModel = mongoose_1.default.model('Orders', OrderSchema);
//# sourceMappingURL=order.models.js.map