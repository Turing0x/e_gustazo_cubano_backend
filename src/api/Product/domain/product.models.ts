import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({

  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: false
  },
  category: {
    type: Object,
    require: false
  },
  subcategory: {
    type: Object,
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
  coin: {
    type: String,
    require: false,
  },
  sellType: {
    type: String,
    require: false,
  },
  box: {
    type: Number,
    require: false,
  },
  weigth: {
    type: Number,
    require: false,
  },
  weigthType: {
    type: String,
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
  commissionDiscount: {
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

export const ProductModel = mongoose.model('products', ProductSchema)