var express = require('express')
  , multer = require('multer');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var port    =   process.env.PORT || 3000;
var User = require('./server/models/user');
var mongoose = require('mongoose')
    , passportLocalMongoose = require('passport-local-mongoose')
    , config = require('./config')
    , db = mongoose.connect(config.development.dbUrl)
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId
    , passport = require('passport')
var uploading = multer({
  dest: __dirname + '../app/assets/uploads/',
  limits: {fileSize: 1000000, files:1},
})

// route middleware that will happen on every request
router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next();
});

// START THE SERVER
// ==============================================
app.listen(port);
console.log('Scrive is running on port ' + port);

app.use(express.static( __dirname + '/'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//-------------------------
// ROUTES
//-------------------------

// REGISTER A NEW USER IN LOGIN.JS
app.route('/register')
.post(function(req, res) {
  console.log('posted to /register')
  console.log(req.body)
  User.create({
     emailAddress: req.body.emailAddress
    , phoneNumber: req.body.phoneNumber
    , firstName: req.body.firstName
    , lastName: req.body.lastName

  }, function (err, user) {
    if (err) {
      console.log(err);
      res.contentType('application/json');
      res.send({ success: 0, message: "Registration failed", errorCode: 'E600-1', error: err });
    } else {
      res.contentType('application/json');
      res.send({ success: 1, message: "Registration successful" });
    }
  });
});

// UPDATE A USERS INFO IN ONBOARDING.JS
app.route('/createProfile')
  .post(function(req, res){
    console.log('posted to /createProfile');
    console.log(req.body);

    User.findOneAndUpdate({emailAddress: req.body.emailAddress},
        {firstName: req.body.firstName, lastName: req.body.lastName},
        function (err){
          if (err) {
            console.log(err);
            res.contentType('application/json');
            res.send({ success: 0, message: "Registration failed", errorCode: 'E600-1', error: err });
          } else {
            res.contentType('application/json');
            res.send({ success: 1, message: "Registration successful" });
          }
        });
  });
