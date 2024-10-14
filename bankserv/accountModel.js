var mongoose = require('mongoose');
// Setup schema
var accountSchema = mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    accountNumber: {
        type: Number,
        required: true
    },
    accountName: String,
    maritalStatus: String,
    addressLine1: String,
    addressLine2: String,
    balance:  Number,
	sortCode: String,
    customerId: String,
    manager: String,
    dateOfBirth: Date,   
    accountType: String,
    accountCurrency: String,
    postCode: String,
    gender: String,
    nationality: String,
    email: String,
    phonenumber: String,
    dateOpened: {
        type: Date,
        default: Date.now
    }
});
// Export Account model
var Account = module.exports = mongoose.model('account', accountSchema);
module.exports.get = function (callback, limit) {
    Account.find(callback).limit(limit);
}