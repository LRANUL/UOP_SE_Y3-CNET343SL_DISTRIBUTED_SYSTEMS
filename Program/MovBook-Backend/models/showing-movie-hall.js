// Importing mongoose to create a model/schema
const mongoose = require('mongoose');

// Creating cinemaHall schema
const showingMovieHallSchema = mongoose.Schema({
    cinemaHallObjectId : {type : String, required:true},
    cinemaLocationObjectId : {type : String, required:true},
    showingSeatDetails : [
      {
        seatId : {type : String, required:true},
        seatNumber : {type: Number, required:true},
        seatUnavailable: {type: Boolean, required:true},
        seatStatus : {type : String, required:true},
        seatType : {type : String, required:true},
        customerObjectId : {type : String, required:true}
      }
    ]
})
module.exports = mongoose.model('showingcinemahall', showingMovieHallSchema); 
