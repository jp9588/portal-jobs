const express = require('express');
const router = require('./routes/index');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, './views'));

app.use('/', router());

app.listen(process.env.PORT || 5001, () => {
	console.log(`SERVER RUNNING ON ${process.env.PORT} PORT...`);
});
