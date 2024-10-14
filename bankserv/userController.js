// Import user model
User = require('./userModel');

// Handle index actions
exports.index = function (req, res) {
    User.get(function (err, user) {
        if (err) {
           return res.json({
                status: "error",
                message: err,
            });
        }
        console.log("=========================")
       console.log(user)
       console.log("-----------------------")
      return res.json(user);
    });
};

// Handle user creation request
exports.new = function (req, res) {
    var user = new User();
    let today = new Date();
    user._id = req.body.userId;
    user.userId = req.body.userId;
	user.pin = req.body.pin;
    user.name = req.body.name;
    user.dateCreated = today;
    
// save the user and check for errors
    user.save(function (err) {
         if (err)
            return res.json(err);
 return res.json({
            message: 'User created..! :'+req.body.userId,
            //data: user
        });
    });
};

// Handle view user info
 exports.view = function (req, res) {
     //  var query = { userId: "tony1" };
     
      console.log("==================");  
      User.findById(req.params._id, function (err, user) {
        if (err)
          return  res.send(err);
          console.log(req.params._id);
         return  res.json({
            data: user
        });
    });
};

  
// 
// Handle update user pin change request
exports.update = function (req, res) {
User.findById(req.params._id, function (err, user) {
        if (err)
         return   res.send(err);
 	console.log('Changing pin for '+req.params._id);
        user._id = req.body.userId ? req.body.userId : user.userId;  
		user.userId = req.body.userId ? req.body.userId : user.userId;
		user.pin = req.body.pin;
        user.name = user.name;

// save the user and check for errors
        user.save(function (err) {
            if (err)
               return res.json(err);
           return res.json({
                message: 'User Info updated',
                data: user
            });
        });
    });
};
 