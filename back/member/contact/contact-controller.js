const Contact = require('./contact-model');

module.exports = class ContactController {

	async create(contactInfo) {
		await Contact.create({ phoneHome: contactInfo.phoneHome, phoneMobile: contactInfo.phoneMobile, email: contactInfo.email })
	}

	async getAll() {
		return await Contact.find({}).exec()
	}

	async delete() {
		await Contact.find({}).remove()
	}

}