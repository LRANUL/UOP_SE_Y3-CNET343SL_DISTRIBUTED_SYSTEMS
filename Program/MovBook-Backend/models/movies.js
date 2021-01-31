const mongoose = require('mongoose');

const movieSchema =mongoose.Schema({
  title: {type : String, required:true },
  description: {type : String, required:true },
  rating: {type : String, required:true },
  imgUrl: {type : String, required:true },
  status: {type : String, required:true },
  showTime: {type : String, required:true },
  videoURL: {type : String, required:true }
})

module.exports = mongoose.model('Movies',movieSchema); 
