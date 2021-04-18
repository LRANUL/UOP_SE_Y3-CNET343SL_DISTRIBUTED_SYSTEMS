const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const AdminSchema = mongoose.Schema({
    name: {
        prefix: { type: String, required: true },
        firstName: { type: String, required: true },
        middleName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    registeredDateTime:{ type: Date, required: true },
    emailAddress: { type: String, required: true, unique: true },    
    phoneNumber: { type: Number, required: true },
    address: {
        streetAddress: { type: String, required: true },
        city: { type: String, required: true },
        postalZipCode: { type: String, required: true },
    }

})


AdminSchema.plugin(uniqueValidator);
module.exports = mongoose.model('admin', AdminSchema);
