// Importing mongoose to create a model/schema
const mongoose = require('mongoose');

// Creating cinemaLocation schema
const cinemaLocationSchema = mongoose.Schema({
  cinemaLocationName: {type : String, required:true },
  cinemaLocationAddress: {
    streetAddress: {type : String, required:true},
    city: {type : String, required:true},
    postalCode: {type : Number, required:true}
  }
})

module.exports = mongoose.model('cinemaLocations', cinemaLocationSchema); 
