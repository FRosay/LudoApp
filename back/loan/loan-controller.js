const Loan = require('./loan-model');
const mongoose = require('mongoose');

module.exports = class LoanController {

    async updateOrCreate(loan) {
        const filter = { _id: loan._id };
        if (!filter._id) { filter._id = new mongoose.Types.ObjectId() }
        const update = {
            loanNumber: loan.loanNumber,
            startDate: loan.startDate,
            endDate: loan.endDate,
            member: loan.memberId,
            game: loan.gameId
        }
        await Loan.findOneAndUpdate(filter, update, { new: true, upsert: true })
    };

    async getAll() {
        return await Loan.find({})
            .populate('member')
            .populate('game')
            .exec()
    };

	async getOne(loanId) {
		return await Loan.findOne({ _id: loanId }).exec();
	};

    async getLast() {
        return await Loan.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
    };

    async deleteOne(loanId) {
        await Loan.deleteOne({ _id: loanId })
    };
};