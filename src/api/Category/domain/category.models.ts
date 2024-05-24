import mongoose from 'mongoose';
import { SubCatSchema } from './subcategory.model';

const CategorySchema = new mongoose.Schema({

  name: {
    type: String,
    default: true
  },
  subcategory: {
    type: [SubCatSchema],
    require: true,
  },
  native: {
    type: Boolean,
    default: true
  }

});

export const CategoryModel = mongoose.model('category', CategorySchema)