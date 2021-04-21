// Importing mongoose to create a model/schema
const mongoose = require('mongoose');

// Creating showingCinemaHallSchema schema
const showingCinemaHallSchema = mongoose.Schema({
  slotObjectId: { type: String, required: true },
  showingMovieObjectId: { type: String, required: true },
  cinemaHallObjectId: { type: String, required: true },
  cinemaLocationObjectId: { type: String, required: true },
  showingSeatDetails: [{
    seatId: { type: String, required: true },
    seatActive: { type: Boolean, required: true },
    seatNumber: { type: String, required: true },
    seatUnavailable: { type: Boolean, required: true },
    seatStatus: { type: String, required: true },
    customerObjectId: { type: String, required: true }
  }]
})

module.exports = mongoose.model('showingCinemaHalls', showingCinemaHallSchema); 
