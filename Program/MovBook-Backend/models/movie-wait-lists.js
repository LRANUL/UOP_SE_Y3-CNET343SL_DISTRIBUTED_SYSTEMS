/**
 * 
 * DEPRECATED - DO NOT USE FOR FURTHER IMPLEMENTATIONS
 * 
 */

// Importing mongoose to create a model/schema
const mongoose = require('mongoose');

// Creating movieWaitList schema
const movieWaitListSchema = mongoose.Schema({
  managerObjectId: {type : String, required:true},
  movieObjectId: [{type : String, required:true}]
})

module.exports = mongoose.model('movieWaitLists', movieWaitListSchema); 
