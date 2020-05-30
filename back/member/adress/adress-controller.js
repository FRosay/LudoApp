const Adress = require('./adress-model');

module.exports = class AdressController {

	async create(adressInfo) {
		await Adress.create({ adress: adressInfo.adress, postalCode: adressInfo.postalCode, city: adressInfo.city })
	}

	async getAll() {
		return await Adress.find({}).exec()
	}

	async delete() {
		await Adress.find({}).remove()
	}

}