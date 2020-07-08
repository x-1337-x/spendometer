require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 7777;

const api = require('./api');
const auth = require('./api/auth');

app.use('/auth', auth);

app.use('/api', api);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
