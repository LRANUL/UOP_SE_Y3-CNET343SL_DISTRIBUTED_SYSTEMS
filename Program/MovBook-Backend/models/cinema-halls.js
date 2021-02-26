// Importing mongoose to create a model/schema
const mongoose = require('mongoose');

// Creating cinemaHall schema
const cinemaHallSchema = mongoose.Schema({
  cinemaLocationObjectId: {type : String, required:true},
  cinemaHallName: {type : String, required:true},
  seatingGridNoOfRows: {type : Number, required:true},
  seatingGridNoOfColumns: {type : Number, required:true},
  seatingDetails: [{
    seatId: {type : String, required:true},
    seatAllocatedPositionNo: {type : String, require:true},
    seatActive: {type : Boolean, required:true},
    seatNumber: {type : String, required:true},
    seatUnavailable: {type : Boolean, required:true}
  }]
})

module.exports = mongoose.model('cinemaHalls', cinemaHallSchema); 
