const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ticketPricesSchema = mongoose.Schema({
    movieObjectId: {type : String, required:true },
    showingTimeSlot: {type : String, required:true },
    ticketCost: {
      adult: {type : Number, required:true},
      children: {type : Number, required:true}
    }
})

ticketPricesSchema.plugin(uniqueValidator);
module.exports = mongoose.model('movieticketcost', ticketPricesSchema); 