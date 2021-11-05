const Membership = require('./membership-model');

module.exports = class MembershipController {

	async updateOrCreate(membership) {
		const filter = { _id: membership._id };
		const update = { };
		await Membership.findOneAndUpdate(filter, update, { new: true, upsert: true })
	}

	async getAll() {
		return await Membership.find({}).exec()
	}

	async getLast() {
        return await Membership.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
    }

	async deleteOne(membershipId) {
		await Membership.deleteOne({ _id: membershipId })
	}

	async deleteAll() {
		await Membership.find({}).deleteMany()
	}

}