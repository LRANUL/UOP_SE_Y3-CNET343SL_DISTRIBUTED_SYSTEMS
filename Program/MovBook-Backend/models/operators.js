const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const OperatorSchema = mongoose.Schema({
    emailAddress: { type: String, required: true, unique: true },
    name: {
        prefix: { type: String, required: true },
        firstName: { type: String, required: true },
        middleName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    phoneNumber: { type: Number, required: true },
    address: {
        streetAddress: { type: String, required: true },
        city: { type: String, required: true },
        postalZipCode: { type: String, required: true },
    },
    accountStatus: { type: String, required: true, default: 'Disabled' },
    registeredDateTime: {
        type: String,
        default: new Date().toLocaleDateString() + ', ' + new Date().toLocaleTimeString(),
    },
})

OperatorSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Operator', OperatorSchema);
