const mongoose = require('mongoose');

const userSchema =mongoose.Schema({
  email: {type : String, required:true },
  pointsAvailable: {type : Number, required:true },
  totalPoints: {type : Number, required:true },
  lastEarnedDate: {type : Date, required:true }
})


module.exports = mongoose.model('loyalty',userSchema); 