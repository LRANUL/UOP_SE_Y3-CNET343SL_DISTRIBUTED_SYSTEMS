const mongoose = require('mongoose');

const bookingHistorySchema =mongoose.Schema({
  email : {type : String, required:true },
  movieTickets: {
    movieObjectId : {type : String, required:true },
    childQuantity: {type : String, required:true },
    adultQuantity: {type : String, required:true },
    posterLink: {type : String, required:true },
    title: {type : String, required:true },
    timeSlot : {type : String, required:true },
    hall: {type : String, required:true },
    location: {type : String, required:true },
    movieTotal: {type : String, required:true },
    seatNumbers : {type : String, required:true },
    slotObjectID : {type : String, required:true },
    ticketCostLKR : {type : String, required:true }
  },
  foodAndBeverages: {
    foodAndBeverageObjectId : {type : String, required:true },
    item: {type : String, required:true }
  },
  purchaseDate : {type : String, required:true },
  mealCostLKR : {type : String, required:true },
  totalCostLKR : {type : String, required:true }
})

module.exports = mongoose.model('bookings',bookingHistorySchema); 