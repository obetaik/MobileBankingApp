var mongoose = require('mongoose');
// Setup schema
var transactionSchema = mongoose.Schema({

	 
    transactionId: {
        type: Number,
        required: true
    },
  
    accountNumber: {
        type: Number,
        required: true
    },
	transactionAmount: {
        type: Number,
        required: true
    },
    transactionCurrency: {
        type: String,
        required: false
    },
    transactionType: {
        type: String,
        required: false
    },
    transactionDesc: {
        type: String,
        required: false,
        default: ''
    },
    transactionAddress: {
        type: String,
        required: false,
        default: ''
    },
    transactionDate: {
        type: Date,
        default: Date.now
    }
});
// Export transaction model
var transaction = module.exports = mongoose.model('transaction', transactionSchema);
module.exports.get = function (callback, limit) {
    Transaction.find(callback).limit(limit);
}

 