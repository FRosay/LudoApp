const Member = require('./member-model');
const mongoose = require('mongoose');

module.exports = class MemberController {

	async updateOrCreate(member) {
		const filter = { _id: member._id };
		if (!filter._id) { filter._id = new mongoose.Types.ObjectId() }
		const update = { 	
							memberNumber: member.memberNumber, firstName: member.firstName, lastName: member.lastName, 
							phoneHome: member.phoneHome, phoneMobile: member.phoneMobile, email: member.email,
							adress: member.adress, postalCode: member.postalCode, city: member.city,
							contribution: member.contribution, contributionRate: member.contributionRate,
						};
		await Member.findOneAndUpdate(filter, update, { new: true, upsert: true });
	};

	async getAll() {
		return await Member.find({}).exec();
	};

	async getOne(memberId) {
		return await Member.findOne({ _id: memberId }).exec();
	};

	async getLast() {
        return await Member.findOne().sort({ field: 'asc', _id: -1 }).limit(1);
    };

	async deleteOne(memberId) {
		await Member.deleteOne({ _id: memberId });
	};
};