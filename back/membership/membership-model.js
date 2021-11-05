var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var membershipSchema = new Schema({
    
});

module.exports = mongoose.model('Membership', membershipSchema);