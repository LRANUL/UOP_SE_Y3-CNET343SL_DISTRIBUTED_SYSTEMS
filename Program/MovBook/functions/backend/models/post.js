const mongoose = require('mongoose');

const postSchema =mongoose.Schema({
  title: {type : String, required:true },
  description: {type : String, required:true }
})

module.exports = mongoose.model('Movies',postSchema); //1st argument is the name and it should start on a capital letter

