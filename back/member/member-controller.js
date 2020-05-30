const Member = require('./member-model');

module.exports = class GameController {

	async create(member) {
		await Member.create({ firstName: member.firstName, lastName: member.lastName })
	}

	async getAll() {
		return await Member.find({}).exec()
	}

	async delete() {
		await Member.find({}).remove()
	}

}