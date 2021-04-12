const mongoose = require('mongoose');

const messagesSchema =mongoose.Schema({
  email: {type : String, required:true },
  status: {type : String, required:true },
  subject: {type : String, required:true },
  message: {type : String, required:true },
  response: {type : String },
})

module.exports = mongoose.model('Messages',messagesSchema); 
