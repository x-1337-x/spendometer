const mongoose = require('mongoose');

const transactionTypes = ['income', 'expense'];
const currency = ['USD', 'EUR'];

const Transaction = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users',
		},
		type: {
			type: String,
			require: true,
			enum: transactionTypes,
			default: 'expense',
		},
		category: String,
		commentary: String,
		amount: {
			type: Number,
			require: true,
		},
		currency: {
			type: String,
			enum: currency,
			default: 'USD',
		},
		date: {
			type: Date,
			default: Date.now,
		},
	},
	{
		collection: 'transactions',
	}
);

module.exports = mongoose.model('Transaction', Transaction);
