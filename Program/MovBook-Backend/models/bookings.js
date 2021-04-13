const mongoose = require('mongoose');

const bookingsSchema =mongoose.Schema({
  email: {type : String },
  movieTickets: {type : Object },
  foodAndBeverages: {type : Object },
})

module.exports = mongoose.model('Bookings',bookingsSchema); 
