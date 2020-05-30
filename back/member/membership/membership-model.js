var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var membershipSchema = new Schema({
    contribution: Number,
    contributionRate: Number,
});

module.exports = mongoose.model('Membership', membershipSchema);