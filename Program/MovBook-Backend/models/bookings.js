const mongoose = require('mongoose');

const bookingsSchema = mongoose.Schema({
  email: { type: String },
  movieTickets: { type: Object },
  foodAndBeverages: { type: Object },
  totalCostLKR: { type: String },
  purchaseDate: {
    type: String,
    default: new Date().toLocaleDateString() + ', ' + new Date().toLocaleTimeString(),
  },
})

module.exports = mongoose.model('Bookings', bookingsSchema);
