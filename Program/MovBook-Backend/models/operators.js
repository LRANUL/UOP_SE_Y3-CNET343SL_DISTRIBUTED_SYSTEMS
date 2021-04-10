const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const OperatorSchema = mongoose.Schema({
    Prefix: { type: String, required: true},
    FirstName: { type: String, required: true },
    MiddleName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Phone: { type: Number, required: true },
    StreetAddress: { type: String, required: true },
    City: { type: String, required: true},
    PostalCode: { type: String, required: true },
})

OperatorSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Operator', OperatorSchema);
