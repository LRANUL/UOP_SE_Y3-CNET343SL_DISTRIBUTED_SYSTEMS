// Importing mongoose to create a model/schema
const mongoose = require('mongoose');

// Creating cinemaLocation schema
const showingExperienceSchema = mongoose.Schema({
  showingExperience: {type : String, required:true },
  description: {type : String, required:true }
})

module.exports = mongoose.model('showingExperiences', showingExperienceSchema); 
