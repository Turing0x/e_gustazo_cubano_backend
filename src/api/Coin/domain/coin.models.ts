import mongoose from 'mongoose';

const CoinSchema = new mongoose.Schema({

  mlc: {
    type: Number,
    default: true
  },
  usd: {
    type: Number,
    require: true,
  },

});

export const CoinModel = mongoose.model('coins', CoinSchema)