const bcrypt = require('bcrypt');

const hashPwd = async (pwd) =>
	new Promise((resolve, reject) => {
		bcrypt.hash(pwd, 10, (err, hash) => {
			if (err) reject(err);
			resolve(hash);
		});
	});

module.exports = {
	hashPwd,
};
