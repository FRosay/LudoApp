const Game = require('./game-model');

module.exports = class GameController {

	async create(game) {
		await Game.create({ name: game.name, 				availability: game.availability, 	authors: game.authors, 
							editor: game.editor,			distributor: game.distributor, 		publishYear: game.publishYear, 
							description: game.description, 	esarIndexes: game.esarIndexes, 		usualGameLenght: game.usualGameLenght, 
							minPlayers: game.minPlayers,	maxPlayers: game.maxPlayers, 		minAge: game.minAge, 
							location: game.location})
	}

	async getAll() {
		return await Game.find({}).exec()
	}

	async deleteAll() {
		await Game.find({}).deleteMany()
	}

}