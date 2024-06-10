import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

  enable: {
    type: Boolean,
    require: false,
    default: true
  },
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  role: {
    type: String,
    require: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    require: false,
  },
  myPeople: {
    type: mongoose.Types.ObjectId,
    require: false,
  },
  commercial_code: {
    type: String,
    require: false,
  },
  personal_info: {
    type: Object,
    require: false,
  }

});

export const UserModel = mongoose.model('users', UserSchema)