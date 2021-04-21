const mongoose = require('mongoose');

const loyaltySchema =mongoose.Schema({
  email: {type : String, required:true },
  pointsAvailable: {type : Number, },
  totalPoints: {type : Number, required:true },
  lastEarnedDate: {type : Date,  }
})


module.exports = mongoose.model('loyalty',loyaltySchema); 