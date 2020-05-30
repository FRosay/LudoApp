var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
  name: String,
  availability: String,
  gameType: String,
  editor: String,
  author: String,
  description: String
});

module.exports = mongoose.model('Game', gameSchema);