const mongoose = require('mongoose');

const bookingDetailsSchema =mongoose.Schema({
  movieObjectId: {type : String, required:true },
  cinemaHallObjectId: {type : String, required:true },
  cinemaLocationObjectId: {type : String, required:true },
  showingExperience: {type : String, required:true },
  showingStartDate: {type : String, required:true },
  showingEndDate: {type : String, required:true },
  showingTime: {type : String, required:true },
})

module.exports = mongoose.model('showingmovie',bookingDetailsSchema); 