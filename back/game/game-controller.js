const Game = require('./game-model');

module.exports = class GameController {

	async create(game) {
		await Game.create({ name: game.name, availability: game.availability })
	}

	async getAll() {
		return await Game.find({}).exec()
	}

	async delete() {
		await Game.find({}).remove()
	}
}