var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var memberSchema = new Schema({
  memberNumber: Number,
  firstName: String,
  lastName: String,
  subscriberTypes: [String],
  phoneHome: Number,
  phoneMobile: Number,
  email: String,
  adress: String,
  postalCode: Number,
  city: String,
  contribution: Number,
  contributionRate: Number,
  loans: [{
    type: ObjectId, 
    ref: 'Loan'
  }],
});

module.exports = mongoose.model('Member', memberSchema);