var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({
  firstName: String,
  LastName: String
});

module.exports = mongoose.model('Member', memberSchema);