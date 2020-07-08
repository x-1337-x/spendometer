// const { check, validationResult } = require('express-validator/check');
const User = require('mongoose').model('User');
const { check, validationResult } = require('express-validator/check');

const regUserValidation = [
	check('name', 'Please Enter a Valid Username').not().isEmpty(),
	check('email', 'Please enter a valid email').isEmail(),
	check('password', 'Please enter a valid password').isLength({
		min: 8,
	}),
];

// const register = async (req, res) => {
// 	const { email, password } = req.body;
// 	await User.create({ email, password });
// 	try {
// 		if (user) res.json({ success: true, user });
// 	} catch (error) {
// 		if (error.code === 11000) {
// 			res.json({
// 				success: false,
// 				error: {
// 					email: 'This email is already regestered',
// 				},
// 			});
// 		} else {
// 			res.json({ success: false, error });
// 		}
// 	}
// };

const register = async (req, res) => {
	const { email, password } = req.body;

	const errors = await validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
		});
	}

	User.create({ email, password })
		.then((user) => {
			res.json({ success: true, user });
		})
		.catch((err) => {
			if (err.code === 11000) {
				res.json({
					success: false,
					err: {
						email: 'This email is already registered',
					},
				});
			} else {
				res.json({ success: false, err });
			}
		});
};
module.exports = {
	regUserValidation,
	register,
};
