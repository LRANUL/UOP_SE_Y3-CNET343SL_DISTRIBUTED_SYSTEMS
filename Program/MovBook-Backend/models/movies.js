// Importing mongoose to create a model/schema
const mongoose = require('mongoose');

// Creating movie schema
const movieSchema = mongoose.Schema({
  title: {type : String, required:true},
  year: {type : String, required:true},
  rated: {type : String, required:true},
  released: {type : String, required:true},
  runtime: {type : String, required:true},
  genre: {type : String, required:true},
  director: {type : String, required:true},
  writer: {type : String, required:true},
  actors: {type : String, required:true},
  plot: {type : String, required:true},
  language: {type : String, required:true},
  country: {type : String, required:true},
  awards: {type : String, required:true},
  poster: {type : String, required:true},
  ratings: [{
    Source: {type : String, required:true},
    Value: {type : String, required:true}
  }],
  metascore: {type : String, required:true},
  imdbRating: {type : String, required:true},
  imdbVotes: {type : String, required:true},
  imdbId: {type : String, required:true},
  type: {type : String, required:true},
  dvd: {type : String, required:true},
  boxOffice: {type : String, required:true},
  production: {type : String, required:true},
  website: {type : String, required:true}
})

module.exports = mongoose.model('movies', movieSchema); 
