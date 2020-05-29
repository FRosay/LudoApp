const Game = require('./game-model');

module.exports = class GameController {

	async create(game) {
		await Game.create({ name: game.name, isAvailable: game.availability })
	}

	async getAll() {
		return await Game.find({}).exec()
	}

}