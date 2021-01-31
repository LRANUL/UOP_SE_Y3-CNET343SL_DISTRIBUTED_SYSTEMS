const mongoose = require('mongoose');

const beverageSchema =mongoose.Schema({
  name: {type : String, required:true },
  price: {type : Number, required:true },
  stock: {type : Number, required:true },
  imgUrl: {type : String, required:true },
})

module.exports = mongoose.model('Beverages',beverageSchema); 
