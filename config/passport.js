const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Usuarios = require('../models/Usuarios');
const bcrypt = require('bcryptjs');

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		async (email, password, done) => {
			const user = await Usuarios.findOne({ email });
			//console.log(user);
			if (!user)
				return done(null, false, {
					message: 'EL usuario no existe'
				});

			const isValid = bcrypt.compareSync(password, user.password);

			if (!isValid)
				return done(null, false, {
					message: 'Password Incorrecto !'
				});

			//sobrevivio a todo
			return done(null, user);
		}
	)
);

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
	const user = Usuarios.findById(id);
	return done(null, user);
});

module.exports = passport;
