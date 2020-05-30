var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
  phoneHome: Number,
  phoneMobile: Number,
  email: String,
});

module.exports = mongoose.model('Contact', contactSchema);