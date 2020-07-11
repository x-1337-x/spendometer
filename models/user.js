const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { hashPwd } = require('../utils/auth');

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
		created: {
			type: Date,
		},
	},
	{
		collection: 'users',
	}
);

User.pre('save', function (next) {
	if (!this.isModified('password') || !this.created) {
		hashPwd(this.password)
			.then((hash) => {
				this.created = Date.now();
				this.password = hash;
				next();
			})
			.catch((error) => console.log(error));
	} else {
		next();
	}
});

User.methods.comparePassword = function (password, cb) {
	return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', User);
