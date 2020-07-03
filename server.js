require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
connectDB();

const PORT = process.env.PORT || 7777;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
