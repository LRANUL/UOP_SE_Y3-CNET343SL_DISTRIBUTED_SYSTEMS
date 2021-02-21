const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema =mongoose.Schema({ // removed the required in some fields for testing purposes 
  email: {type : String, required:true , unique:true},
  password: {type : String, required:true },
  name: {type : String  }, 
  status: {type : String},
  type: {type : String  },
  address: {type : String},
  phone: {type : Number }
})


userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User',userSchema); 
