var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var loanSchema = new Schema({
    loanNumber: Number,
    startDate: Date,
    endDate: Date,
    member: {
        type: ObjectId, 
        ref: 'Member'
    },
    game: {
        type: ObjectId, 
        ref: 'Game'
    }
});

module.exports = mongoose.model('Loan', loanSchema);