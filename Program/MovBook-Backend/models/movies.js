// Importing mongoose to create a model/schema
const mongoose = require('mongoose');

// Creating movie schema
const movieSchema = mongoose.Schema({
  movieStatus: {type : String, required:true},
  movieTitle: {type : String, required:true},
  rated: {type : String, required:true},
  releasedYear: {type : String, required:true},
  releasedDate: {type : String, required:true},
  movieRuntime: {type : String, required:true},
  genre: {type : String, required:true},
  director: {type : String, required:true},
  writer: {type : String, required:true},
  actors: {type : String, required:true},
  plot: {type : String, required:true},
  language: {type : String, required:true},
  country: {type : String, required:true},
  awards: {type : String, required:true},
  posterLink: {type : String, required:true},
  ratings: [
    {
      source: {type : String, required:false},
      value: {type : String, required:false}
    }
  ],
  imdb: {
    imdbID: {type : String, required:true},
    imdbVotes: {type : String, required:true},
    imdbRating : {type : String, required:true}
    
  },
  boxOffice: {type : String, required:true},
  production: {type : String, required:true},
  website: {type : String, required:true}
})

module.exports = mongoose.model('movies', movieSchema); 
