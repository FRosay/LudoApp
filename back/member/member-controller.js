const Member = require('./member-model');

module.exports = class MemberController {

	async create(member) {
		await Member.create({ memberNumber: member.memberNumber, firstName: member.firstName, lastName: member.lastName, 
							  subscriberTypes: member.subscriberTypes })
	}

	async getAll() {
		return await Member.find({}).exec()
	}

	async getLast() {
        return await Member.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
    }

	async delete() {
		await Member.find({}).remove()
	}

}