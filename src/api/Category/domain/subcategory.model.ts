import mongoose from 'mongoose';

const SubCatSchema = new mongoose.Schema({

  name: {
    type: String,
    required: false
  }

})

const SubCat = mongoose.model('subcat', SubCatSchema)
export { SubCat, SubCatSchema }
