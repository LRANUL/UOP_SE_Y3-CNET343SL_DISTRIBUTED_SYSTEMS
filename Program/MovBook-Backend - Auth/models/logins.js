const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const loginSchema =mongoose.Schema({ // removed the required in some fields for testing purposes 
  email: {type : String, required:true , unique:true},
  password: {type : String, required:true },
  name: {type : String  }, 
  status: {type : String},
  type: {type : String  },
  address: {type : String},
  phone: {type : String },
  passwordResetToken: {type : String},
  passwordTokenExpitation: {type : Date}
})


loginSchema.plugin(uniqueValidator);
module.exports = mongoose.model('login',loginSchema); 
