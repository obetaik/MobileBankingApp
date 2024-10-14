// Import transaction model
Transaction = require('./transactionModel');
//txn = require('./transactionModel');
// Handle index actions
exports.index = function (req, res) {
    Transaction.get(function (err, transaction) {
        if (err) {
           return res.json({
                status: "error",
                message: err,
            });
        }
        console.log(transaction);
     return  res.json(transaction);
    });
};
// Handles transaction creations
exports.new = function (req, res) {
    let transactionId = Math.floor(Math.random() * 1000)+1; // generate a random number and round it up next integer in 1000s
    let today = new Date();
    var transaction = new Transaction();
	transaction.transactionId = transactionId;
    transaction.accountNumber = req.body.fromAccount;
    transaction.transactionSrlNumber = 1;
    transaction.transactionAmount = req.body.transactionAmount;
    transaction.transactionDate = today;
    transaction.transactionType = "DEBIT";
    transaction.transactionDesc = req.body.transactionDesc;
    transaction.transactionAddress = req.body.transactionAddress;
    transaction.transactionCurrency = req.body.transactionCurrency;

    //===========SECOND/ CREDIT LEG ======
    var transactionCR = new Transaction();
	transactionCR.transactionId = transactionId;
    transactionCR.accountNumber = req.body.toAccount;
    transactionCR.transactionSrlNumber = 2;
    transactionCR.transactionAmount = req.body.transactionAmount;
    transactionCR.transactionDate = today;
    transactionCR.transactionType = "CREDIT";
    transactionCR.transactionDesc = req.body.transactionDesc;
    transactionCR.transactionAddress = req.body.transactionAddress;
    transactionCR.transactionCurrency = req.body.transactionCurrency;

   // console.log(req.body.transactionDesc);
   // console.log(req.body.transactionAddress);
    console.log(req.body);
// save the transaction and check for errors
    transactionCR.save(function (err) {
         if (err){
            return  res.json(err);
         }        
    });
    transaction.save(function (err) {
        if (err){
           return  res.json(err);
        }
       return res.json({
               message: 'Transaction successfully.. tran Id: '+transactionId,
             // data: transaction
            });
   });
};
// Handle view transaction info
exports.view = function (req, res) {
    Transaction.findById(req.params.transaction_id, function (err, transaction) {
        if (err)
           return res.send(err);
       return res.json({
  		   transaction
        });
    });
};


exports.viewByAccount = function (req, res) {
    console.log('viewByAccount: ',req.params.fromAccount)
//Transaction.find({accountNumber: '2255555 '},function(err, data)  {
    Transaction.find({"$expr" : {"$eq" : [{"$toInt" :"$accountNumber"} ,{"$toInt" :req.params.fromAccount} ]}},function(err, transaction)  {
    if (err){
        console.log(err);
    }
    else{
        console.log('.....s..s..s..');
        console.log("Records found :",transaction);
        return res.json({transaction});
    }
  });
};
// Handle view transaction info
exports.viewByDate = function (req, res) {
    Transaction.findById(req.params.transaction_id, function (err, transaction) {
        if (err)
           return res.send(err);
       return res.json({
  		   transaction
        });
    });
};
 
 