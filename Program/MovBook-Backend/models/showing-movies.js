// Importing mongoose to create a model/schema
const mongoose = require('mongoose');

// Creating showingMovie schema
const showingMovieSchema = mongoose.Schema({
  movieObjectId: { type: String, required: true },
  cinemaHallObjectId: { type: String, required: true },
  cinemaLocation: {
    cinemaLocationObjectId: { type: String, required: true },
    cinemaLocationName: { type: String, required: true },
    cinemaLocationAddress: {
      streetAddress: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true }
    }
  },
  showingStartDate: { type: String, required: true },
  showingEndDate: { type: String, required: true },
  showingSlots: [{
    showingExperience: { type: String, required: true },
    showingDate: { type: String, required: true },
    timeSlotStartTime: { type: String, required: true },
    timeSlotEndTime: { type: String, required: true },
    adultsTicketFeeLKR: { type: String, required: true },
    childrenTicketFeeLKR: { type: String, required: true }
  }]
})

module.exports = mongoose.model('showingMovies', showingMovieSchema); 