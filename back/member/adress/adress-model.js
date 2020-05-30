var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adressSchema = new Schema({
  adress: String,
  postalCode: Number,
  city: String,
});

module.exports = mongoose.model('Adress', adressSchema);