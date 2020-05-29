var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
  name: String,
  availability: String
});

module.exports = mongoose.model('Game', gameSchema);