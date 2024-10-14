// Initialize express router
let router = require('express').Router();

User = require('./userModel');
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API testing by tony',
        message: 'Welcome to BCU Banking service!',
    });
});


router.get('/usersss/:userId', function (req, res) {
 
      console.log("==================");
     


fire();
      console.log("Here");
     // module.exports = mongoose.model('Resource', new User());
  //});
    });
  
    async function fire(){
        
        
      var MongoClient = require('mongodb').MongoClient;
      var url = "mongodb://localhost:27017/";
      
 await MongoClient.connect(url, function(err, db2) {
    if (err) throw err;
    var dbo = db2.db("BCU_BANKING");
    var query = { userId: "tony1" };
    dbo.collection("user").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db2.close();
    });
  });
    }

// Import user controller
var userController = require('./userController');
// User routes
router.route('/user')
    .get(userController.index)
    .post(userController.new);
router.route('/user/:_id')
    .get(userController.view)
    .put(userController.update);




// Import account controller
var accountController = require('./accountController');
// Accounts routes
router.route('/accounts')
    .get(accountController.index)
    .post(accountController.new);
router.route('/accounts/:userId')
    .get(accountController.viewByUserId)
    .patch(accountController.update)
    .put(accountController.update)
    .delete(accountController.delete);


    var transactionController = require('./transactionController');
    // transaction routes
router.route('/transaction')
    .get(transactionController.index)
    .post(transactionController.new);
router.route('/transaction/:fromAccount')
    .get(transactionController.viewByAccount)
    //.get(transactionController.view)
    //.get(transactionController.viewByAccount)
   

// Import contact controller
var contactController = require('./contactController');
const { default: mongoose } = require('mongoose');
// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);
router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);

    
// Export API routes
module.exports = router;