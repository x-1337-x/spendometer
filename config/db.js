const mongoose = require('mongoose');
const dbUser = process.env.DB_USER;
const dbPwd = process.env.DB_PASS;

const db = `mongodb+srv://${dbUser}:${dbPwd}@cluster0-hn8pi.azure.mongodb.net/spendometer?retryWrites=true&w=majority`;

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
		console.log('Connected to the DB');
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

module.exports = connectDB;
