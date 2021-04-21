/**
 * 
 * DEPRECATED - DO NOT USE FOR FURTHER IMPLEMENTATIONS
 * 
 */


// Importing mongoose to create a model/schema
const mongoose = require('mongoose');

// Creating cinemaHall schema
const showingMovieHallSchema = mongoose.Schema({
    showingCinemaHallObjectId: {type : String, required:true},
    slotObjectId: {type : String, required:true},
    showingMovieObjectId: {type : String, required:true},
    cinemaHallObjectID: {type : String, required:true},
    cinemaLocationObjectId : {type : String, required:true},
    showingSeatDetails : [
    {
      seatObjectId: {type : String, required:true},
      seatId : {type : String, required:true},
      seatNumber: {type: String, required:true},
      seatUnavailable: {type : Boolean, required:true},
      seatStatus : {type : String, required:true},
      seatType : {type : String, required:true},
      customerObjectId : {type : String, required:true},
    }
  ]
})
module.exports = mongoose.model('showingcinemahall', showingMovieHallSchema); 
