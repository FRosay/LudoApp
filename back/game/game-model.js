var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
  name: String,
  availability: String,
  authors: [String],
  editor: String,
  distributor: String,
  publishYear: Number,
  description: String,
  esarIndexes: [String],
  usualGameLenght: Number,
  minPlayers: Number,
  maxPlayers: Number,
  minAge: Number,
  location: String,
});

module.exports = mongoose.model('Game', gameSchema);