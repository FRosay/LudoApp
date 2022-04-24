const Game = require('./game-model');
const mongoose = require('mongoose');

module.exports = class GameController {

	async updateOrCreate(game) {
		const filter = { _id: game._id };
		if (!filter._id) { filter._id = new mongoose.Types.ObjectId() }
		const update = {
			name: game.name, availability: game.availability, authors: game.authors,
			editor: game.editor, distributor: game.distributor, publishYear: game.publishYear,
			description: game.description, esarIndexes: game.esarIndexes, usualGameLenght: game.usualGameLenght,
			minPlayers: game.minPlayers, maxPlayers: game.maxPlayers, minAge: game.minAge,
			location: game.location
		};
		await Game.findOneAndUpdate(filter, update, { new: true, upsert: true });
	};

	async changeGameAvailability(gameId, newAvailability) {
		await Game.findByIdAndUpdate(gameId, { availability: newAvailability });
	};

	async getAll() {
		return await Game.find({}).exec();
	};

	async getAvailable() {
		return await Game.find({ availability: 'Available' }).exec();
	};

	async getOne(gameId) {
		return await Game.findOne({ _id: gameId }).exec();
	};

	async deleteOne(gameId) {
		await Game.deleteOne({ _id: gameId });
	};
};