const Member = require('./member-model');

module.exports = class GameController {

	async create(firstName, lastName) {
		await Member.create({ firstName: firstName }, { lastName: lastName })
	}

	async getAll() {
		return await Member.find({}).exec()
	}

}