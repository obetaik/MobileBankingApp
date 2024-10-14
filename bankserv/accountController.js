// Import account model
Account = require('./accountModel');
// Handle index actions
exports.index = function (req, res) {
    Account.get(function (err, accounts) {
        if (err) {
           return res.json({
                status: "error",
                message: err,
            });
        }
       // res.json({accounts
            //status: "success",
            //message: "Accounts retrieved successfully",
            //data: accounts
       // });
       console.log("Accounts retrieved successfully")
      return res.json(accounts);
    });
};

// Handle view account info
exports.viewByUserId = function (req, res) {
    //Account.findById(req.params.userId, function (err, account) {
	Account.find({customerId:req.params.userId}, function (err, accounts) {
        if (err)
          return  res.send(err);
          //console.log(" request param :"+req.params.userId);
          
            //message: 'Account details loading..',
            console.log(req.params.userId+" Accounts retrieved successfully: "+accounts)
            return res.json(accounts);
        
    });
};

// Handle account opening request
exports.new = function (req, res) {
    var account = new Account();
    let today = new Date();
    let acctId = Math.floor(Math.random() * 100000)+1; // generate a random number and round it up next integer in 100,000s
    account._id = acctId;
    account.accountNumber = acctId;
    account.accountName = req.body.firstname+' '+ req.body.lastname;
    account.balance =0;
    account.dateOpened = today;
    account.dateofBirth = req.body.dateOfBirth;
    account.addressLine1= req.body.addressLine1;
    account.addressLine2 = req.body.addressLine2;
    account.accountType = req.body.accountType;
	account.sortCode = '20-20-20';
    account.customerId = req.body.customerId;
    account.manager = 'not assigned';
	account.accountStatus = req.body.accountStatus;
    account.phonenumber = req.body.phonenumber;
    account.gender = req.body.gender;
    account.maritalStatus = req.body.maritalStatus;
    account.email = req.body.email;
    account.postCode = req.body.postCode;
    account.city = req.body.city;
    account.nationality = req.body.nationality;
    account.accountCurrency = req.body.accountCurrency;
    
    console.log(req.body);
// save the account and check for errors
    account.save(function (err) {
         if (err)
            return res.json(err);
 return res.json({
            message: 'Account created..! :'+acctId,
            //data: account
        });
    });
};
// Handle view account info
exports.view = function (req, res) {
    Account.findById(req.params._id, function (err, account) {
        if (err)
          return  res.send(err);
          console.log(" request param :"+req.params._id);
         return  res.json({
            //message: 'Account details loading..',
            data: account
        });
    });
};
// Handle update account name
exports.update = function (req, res) {
Account.findById(req.params.account_id, function (err, account) {
        if (err)
         return   res.send(err);
 	
		account.accountNumber = req.body.accountNumber ? req.body.accountNumber : account.accountNumber;
		/*account.balance = req.body.balance;
		account.dateOpened = req.body.dateOpened;
		account.accountType = req.body.accountType;
		account.branchId = req.body.branchId;
		account.customerId = req.body.customerId;
		account.manager = req.body.manager;
		account.status = req.body.status;
		account.debitLimit = req.body.debitLimit;
		*/
// save the account and check for errors
        account.save(function (err) {
            if (err)
               return res.json(err);
           return res.json({
                message: 'Account Info updated',
                data: account
            });
        });
    });
};
// Handle delete account
exports.delete = function (req, res) {
    Account.remove({
        _id: req.params.account_id
    }, function (err, account) {
        if (err)
         return   res.send(err);
    return res.json({
            status: "success",
            message: 'Account deleted'
        });
    });
};