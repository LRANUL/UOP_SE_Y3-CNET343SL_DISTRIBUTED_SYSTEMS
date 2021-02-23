const mongoose = require('mongoose');

const beverageSchema =mongoose.Schema({
  userEmail: {type : String, required:true },
  movieName: {type : String, required:true },
  imgUrl: {type : String, required:true },
  location: {type : String, required:true },
  hall: {type : String, required:true },
  seatNumber: {type : String, required:true },
  time: {type : String, required:true },
  date: {type : Date, required:true },
  totalCost: {type : Number, required:true }
})

module.exports = mongoose.model('bookings',beverageSchema); 