const mongoose = require('mongoose');

const userSchema =mongoose.Schema({
  email: {type : String, required:true },
  password: {type : String, required:true },
  name: {type : String, required:true },
  status: {type : String, required:true },
  type: {type : String, required:true },
  address: {type : String, required:true },
  phone: {type : String, required:true }
})



module.exports = mongoose.model('Users',userSchema); 
