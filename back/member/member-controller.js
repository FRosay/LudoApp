const Member = require('./member-model');

module.exports = class MemberController {

	async create(member) {
		await Member.create({ 	memberNumber: 		member.memberNumber, 
								firstName: 			member.nameInfo.firstName, 
								lastName: 			member.nameInfo.lastName, 
								phoneHome: 			member.contactInfo.phoneHome,
								phoneMobile: 		member.contactInfo.phoneMobile,
								email: 				member.contactInfo.email,
								adress: 			member.adressInfo.adress,
								postalCode: 		member.adressInfo.postalCode,
								city: 				member.adressInfo.city,
								contribution: 		member.memberInfo.contribution,
								contributionRate: 	member.memberInfo.contributionRate,
							})
	}

	async getAll() {
		return await Member.find({}).exec()
	}

	async getLast() {
        return await Member.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
    }

	async deleteOne(memberId) {
		await Member.deleteOne({ _id: memberId })
	}

	async deleteAll() {
		await Member.find({}).deleteMany()
	}

}