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
        .populate('member', '-_id')
        .populate('game', '-_id')
        .exec()
    }
    
    async getLast() {
        return await Loan.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
    }

	async deleteAll() {
		await Loan.find({}).deleteMany()
	}
	
}