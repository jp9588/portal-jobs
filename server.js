const express = require('express');
const router = require('./routes/index');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const passport = require('./config/passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const moongose = require('mongoose');

const app = express();
connectDB();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, './views'));

app.use(cookieParser());

app.use(
	session({
		secret: 'Es un secreto',
		key: 'otro secreto 987635',
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router());

app.listen(process.env.PORT || 5001, () => {
	console.log(`SERVER RUNNING ON ${process.env.PORT} PORT...`);
});
