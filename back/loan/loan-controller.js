const Loan = require('./loan-model');

module.exports = class LoanController {

	async create(loan) {
        await Loan.create({ 
            loanNumber: loan.loanNumber, 
            startDate:  loan.startDate,
            endDate:    loan.endDate,
            member:     loan.memberId,
            game:       loan.gameId })
	}

	async getAll() {
        return await Loan.find({})
        .populate('member')
        .populate('game')
        .exec()
    }
    
    async getLast() {
        return await Loan.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
    }

    async deleteOne(loanId) {
		await Loan.deleteOne({ _id: loanId })
	}

	async deleteAll() {
		await Loan.find({}).deleteMany()
	}
	
}