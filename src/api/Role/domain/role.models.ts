import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({

  code: {
    type: String,
    require: true
  },

});

export const RoleModel = mongoose.model('roles', RoleSchema)