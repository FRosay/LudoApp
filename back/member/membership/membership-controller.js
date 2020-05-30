const Membership = require('./membership-model');

module.exports = class MembershipController {

	async create(membershipInfo) {
        await Membership.create({ contribution: membershipInfo.contribution, contributionRate: membershipInfo.contributionRate })
	}

	async getAll() {
		return await Membership.find({}).exec()
	}

	async delete() {
		await Membership.find({}).remove()
	}

}