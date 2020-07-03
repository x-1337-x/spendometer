const mongoose = require('mongoose');

const User = mongoose.Schema(
	{
		email: {
			type: String,
			require: true,
			unique: true,
		},
		password: {
			type: String,
			require: true,
		},
		name: {
			type: String,
			require: true,
		},
	},
	{
		collection: 'users',
	}
);

module.exports = mongoose.model('User', User);
