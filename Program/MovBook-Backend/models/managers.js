const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ManagerSchema = mongoose.Schema({
    Prefix: { type: String, required: true, unique: true },
    FirstName: { type: String, required: true, unique: true },
    MiddleName: { type: String, required: true, unique: true },
    LastName: { type: String, required: true, unique: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true, unique: true },
    RetypePassword: { type: String, required: true, unique: true },
    Phone: { type: Number, required: true, unique: true },
    StreetAddress: { type: String, required: true, unique: true },
    City: { type: String, required: true, unique: true },
    PostalCode: { type: String, required: true, unique: true },

})


ManagerSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Manager', ManagerSchema);
