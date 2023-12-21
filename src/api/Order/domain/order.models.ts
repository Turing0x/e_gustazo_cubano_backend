import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({

  finish: {
    type: Boolean,
    default: false
  },
  invoice_number: {
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
  commision: {
    type: Number,
    require: true,
  },
  seller: {
    type: Object,
    require: true,
  }

});

export const OrderModel = mongoose.model('Orders', OrderSchema)