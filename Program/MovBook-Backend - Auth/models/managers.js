const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ManagerSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name:
    {
        prefix: { type: String, required: true },
        firstName: { type: String, required: true },
        middleName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    phone: { type: Number, required: true },
    address: {
        streetAddress: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true }
    }

})


ManagerSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Manager', ManagerSchema);
