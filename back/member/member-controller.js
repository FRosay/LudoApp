const Member = require('./member-model');

module.exports = class MemberController {

	async create(member) {
		await Member.create({ firstName: member.firstName, lastName: member.lastName, subscriberTypes: member.subscriberTypes })
	}

	async getAll() {
		return await Member.find({}).exec()
	}

	async delete() {
		await Member.find({}).remove()
	}

}