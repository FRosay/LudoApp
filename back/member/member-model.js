var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var memberSchema = new Schema({
  memberNumber: Number,
  firstName: String,
  lastName: String,
  subscriberTypes: [String],
  loans: [{
    type: ObjectId, 
    ref: 'Loan'
  }],
  adress: {
    type: ObjectId, 
    ref: 'Adress'
  },
  contact: {
    type: ObjectId, 
    ref: 'Contact'
  },
  membership: {
    type: ObjectId, 
    ref: 'Membership'
  },
});

module.exports = mongoose.model('Member', memberSchema);