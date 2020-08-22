// const { check, validationResult } = require('express-validator/check');
const User = require('mongoose').model('User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtOptions = {
	expiresIn: '365d',
};

const regUserValidation = [
	check('name', 'Please Enter a Valid Username').not().isEmpty(),
	check('email', 'Please enter a valid email').isEmail(),
	check('password', 'Please enter a valid password').isLength({
		min: 8,
	}),
];

const loginUserValidation = [
	check('email', 'Please enter a valid email').isEmail(),
	check('password', 'Please enter a valid password').isLength({
		min: 8,
	}),
];

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

const login = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
		});
	}

	const { email, password } = req.body;
	User.findOne({ email }).then((user) => {
		if (!user) {
			return res.json({
				success: false,
				err: { password: 'Wrong email or password' },
			});
		}

		user
			.comparePassword(password)
			.then((isMatch) => {
				if (!isMatch) {
					return res.json({
						success: false,
						err: { password: 'Wrong password' },
					});
				}

				const payload = { userId: user._id };

				const token = jwt.sign(payload, secret, jwtOptions);

				res.json({ success: true, token });
			})
			.catch((err) => {
				res.json({ success: false, err: 'could not findOne' });
			});
	});
};

const validate = (req, res) => {
	const { token } = req.body;

	jwt.verify(token, secret, (err, decoded) => {
		if (err) {
			return res.json({ success: false, err: err.message });
		}

		const payload = { userId: decoded.userId };

		const token = jwt.sign(payload, secret, jwtOptions);

		res.send({ success: true, token });
	});
};

module.exports = {
	regUserValidation,
	loginUserValidation,
	register,
	login,
	validate,
};
