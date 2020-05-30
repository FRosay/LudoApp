const Game = require('./game-model');

module.exports = class GameController {

	async create(game) {
		await Game.create({ name: game.name, availability: game.availability, gameType: game.gameType,
							editor: game.editor, author: game.author, description: game.description })
	}

	async getAll() {
		return await Game.find({}).exec()
	}

	async delete() {
		await Game.find({}).remove()
	}

}