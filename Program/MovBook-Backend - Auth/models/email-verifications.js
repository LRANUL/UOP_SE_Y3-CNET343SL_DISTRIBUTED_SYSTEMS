// Importing mongoose to create a model/schema
const mongoose = require('mongoose');

// Creating emailVerification schema
const emailVerificationScheme = mongoose.Schema({
  loginObjectId: { type: String, required: true },
  pinCode: { type: String, required: true },
  generatedDateTimeServer: { type: String, required: true }
})

module.exports = mongoose.model('emailVerifications', emailVerificationScheme); 
