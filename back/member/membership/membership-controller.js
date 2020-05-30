const Membership = require('./contact-model');

module.exports = class MembershipController {

	async create(membershipInfo) {
        await Contact.create({ contribution: membershipInfo.contribution, contributionRate: membershipInfo.contributionRate })
	}

	async getAll() {
		return await Contact.find({}).exec()
	}

	async delete() {
		await Contact.find({}).remove()
	}

}