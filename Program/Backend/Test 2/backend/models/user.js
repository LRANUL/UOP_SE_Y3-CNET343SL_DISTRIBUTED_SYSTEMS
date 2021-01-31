const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema =mongoose.Schema({
  email: {type : String, required:true, unique:true },
  password: {type : String, required:true }
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User',userSchema); //1st argument is the name and it should start on a capital letter
