var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var port    =   process.env.PORT || 3000;
var mongoose = require('mongoose'),
  passportLocalMongoose = require('passport-local-mongoose');
var config = require('../../config.js')

var shortid = require('shortid');

var userSchema = new mongoose.Schema({
   firstName     : String
  , lastName      : String
  , emailAddress : String
  , phoneNumber : Number
  , activeUser  : Boolean


});

var User = mongoose.model('User', userSchema);


module.exports = mongoose.model('User', User);

// , bio           : String
// , deviceToken   : String
// , emailAddress  : { type : String, lowercase : true }
// , userType    : { type : String, default : '' }
// , password    : String
// , created_at  : Date
// , updated_at  : Date
// , phoneNumber : { type : String, default : '' }
// , location: {
//     lon   : { type: Number, default: 0 }
//   , lat   : { type: Number, default: 0 }
//   }
// , currentCity : { type: String, lowercase: true }
// , price : { type: Number, default: 0}
// , rating : { type: Number, default: 0 }
// , pictureUrl : String
// , createdProfile : { type: Boolean , default: false}
// , verifiedWithLinkedIn : { type: Boolean, default: false }
// , linkedinId : String
// , linkedinMemberNumber : String
// , bookingBadgeCount : { type : Number, default : 0 }
// , directRequestBadgeCount : { type : Number, default : 0 }
// , country : { type: String, default: ''}
// , stripeToken : { type : String, default : '' }
// , stripeUserId : { type : String, default : '' }
// , stripePublishableKey : { type : String, default : '' }
// , stripeCustomerId : { type : String, default : '' }
// , stripeCardToken : { type : String, default : '' }
// , totalRatingScore : { type : Number, default : 0 }
// , bookingsCompleted : { type : Number, default : 0 }
// , languages : []
// , appearanceTypes : []
// , expertise : []
// , promoCode: {
//       type: String,
//       unique: true,
//       required: true
//       //default: shortid.generate
//   }
// , promotionsRedeemed        : [{ type: mongoose.Schema.ObjectId, ref: "Promotion" }]
// , availablePromotions       : [{ type: mongoose.Schema.ObjectId, ref: "Promotion" }]
// , clioAccessToken           : { type: String, default: '' }
// , clioUserId                : { type: String, default: '' }
// , verifiedWithClio          : { type: Boolean, default: false }
// , verifiedIdentity          : { type: Boolean, default: false }
// , verifiedBankAccount       : { type: Boolean, default: false }
// , verifiedAddress           : { type: Boolean, default: false }
// , usedReferralCode          : { type: Boolean, default: false }
// , referringUserId           : { type: mongoose.Schema.ObjectId }
// , workAddress : {
//     lon   : { type: Number, default: 0 }
//   , lat   : { type: Number, default: 0 }
//   }
// , createdStripeAccount : { type: Boolean, default: false }
// , favoriteUsers       : [{ type: mongoose.Schema.ObjectId, ref: "User" }]
// , resetPasswordToken : { type : String, default : '' }
// , resetPasswordExpires : { type : String, default : '' }

// var mongoose = require('mongoose')
//     , passportLocalMongoose = require('passport-local-mongoose')
//     , config = require('../config')
//     , db = mongoose.connect(config.development.dbUrl)
//     , Schema = mongoose.Schema
//     , ObjectId = Schema.ObjectId
//     , passport = require('passport')
//
// var shortid = require('shortid');
//
// var User = new Schema({
//     user          : ObjectId
//   , firstName     : String
//   , lastName      : String
//   , bio           : String
//   , deviceToken   : String
//   , emailAddress  : { type : String, lowercase : true }
//   , userType    : { type : String, default : '' }
//   , password    : String
//   , created_at  : Date
//   , updated_at  : Date
//   , phoneNumber : { type : String, default : '' }
//   , location: {
//       lon   : { type: Number, default: 0 }
//     , lat   : { type: Number, default: 0 }
//     }
//   , currentCity : { type: String, lowercase: true }
//   , price : { type: Number, default: 0}
//   , rating : { type: Number, default: 0 }
//   , pictureUrl : String
//   , createdProfile : { type: Boolean , default: false}
//   , verifiedWithLinkedIn : { type: Boolean, default: false }
//   , linkedinId : String
//   , linkedinMemberNumber : String
//   , bookingBadgeCount : { type : Number, default : 0 }
//   , directRequestBadgeCount : { type : Number, default : 0 }
//   , country : { type: String, default: ''}
//   , stripeToken : { type : String, default : '' }
//   , stripeUserId : { type : String, default : '' }
//   , stripePublishableKey : { type : String, default : '' }
//   , stripeCustomerId : { type : String, default : '' }
//   , stripeCardToken : { type : String, default : '' }
//   , totalRatingScore : { type : Number, default : 0 }
//   , bookingsCompleted : { type : Number, default : 0 }
//   , languages : []
//   , appearanceTypes : []
//   , expertise : []
//   , promoCode: {
//         type: String,
//         unique: true,
//         required: true
//         //default: shortid.generate
//     }
//   , promotionsRedeemed        : [{ type: mongoose.Schema.ObjectId, ref: "Promotion" }]
//   , availablePromotions       : [{ type: mongoose.Schema.ObjectId, ref: "Promotion" }]
//   , clioAccessToken           : { type: String, default: '' }
//   , clioUserId                : { type: String, default: '' }
//   , verifiedWithClio          : { type: Boolean, default: false }
//   , verifiedIdentity          : { type: Boolean, default: false }
//   , verifiedBankAccount       : { type: Boolean, default: false }
//   , verifiedAddress           : { type: Boolean, default: false }
//   , usedReferralCode          : { type: Boolean, default: false }
//   , referringUserId           : { type: mongoose.Schema.ObjectId }
//   , workAddress : {
//       lon   : { type: Number, default: 0 }
//     , lat   : { type: Number, default: 0 }
//     }
//   , createdStripeAccount : { type: Boolean, default: false }
//   , favoriteUsers       : [{ type: mongoose.Schema.ObjectId, ref: "User" }]
//   , resetPasswordToken : { type : String, default : '' }
//   , resetPasswordExpires : { type : String, default : '' }
