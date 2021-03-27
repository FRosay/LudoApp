const Loan = require('./loan-model');

module.exports = class LoanController {

	async create(loan) {
        await Loan.create({ 
            loanNumber: loan.loanNumber, 
            startDate: loan.startDate,
            endDate: loan.endDate,
            memberId: loan.memberId,
            gameId: loan.gameId })
	}

	async getAll() {
        return await Loan.find({})
        .populate('memberId', '-_id')
        .populate('gameId', '-_id')
        .exec()
    }
    
    async getLast() {
        return await Loan.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
    }

	async deleteAll() {
		await Loan.find({}).deleteMany()
	}
	
}