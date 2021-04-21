const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const customerSchema =mongoose.Schema({
    name:
    {
      prefix: {type : String},
      firstName: {type : String},
      middleName: {type : String},
      lastName: {type : String},
    },
    email: {type : String, required:true , unique:true},
    registeredDateTime: {type : String},
    address: 
    {
      streetAddress: {type : String},
      city: {type : String},
      postalZipCode: {type : String}
    },
    phone: {type : String}
})

customerSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Customer',customerSchema); 