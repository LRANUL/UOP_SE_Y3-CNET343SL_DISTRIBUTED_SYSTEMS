const mongoose = require('mongoose');

const bookingHistorySchema =mongoose.Schema({
  customerObjectId : {type : String, required:true },
  movieTickets: {
   movieTicketsId: {type : String, required:true },
   movieObjectId: {type : String, required:true },
   movieName: {type : String, required:true },
   moviePoster: {type : String, required:true },
   hallName: {type : String, required:true },
   location: {type : String, required:true },
   seatNumber: {type : Number, required:true },
   hallId: {type : String, required:true },
   timeSlot: {type : String, required:true },
   date: {type : Date, required:true },
   ticketCostLKR: {type : Number, required:true }
  },
  foodAndBeverages: {
    foodAndBeverageObjectId: {type : String, required:true },
    quantity: {type : Number, required:true },
    mealCostLKR: {type : Number, required:true }
  },
  totalCostLKR: {type : Number, required:true }
})

module.exports = mongoose.model('bookings',bookingHistorySchema); 