import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({

  date: {
    type: String,
    require: true
  },
  product: {
    type: Object,
    require: true
  },
  owner: {
    type: mongoose.Types.ObjectId,
    require: true,
  },

});

export const OrderModel = mongoose.model('Orders', OrderSchema)