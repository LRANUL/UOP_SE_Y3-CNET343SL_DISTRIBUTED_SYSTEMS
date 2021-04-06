const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ManagerSchema = mongoose.Schema({
    Prefix: { type: String, required: true},
    FirstName: { type: String, required: true },
    MiddleName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    RetypePassword: { type: String, required: true},
    Phone: { type: Number, required: true },
    StreetAddress: { type: String, required: true },
    City: { type: String, required: true},
    PostalCode: { type: String, required: true },

})


ManagerSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Manager', ManagerSchema);
