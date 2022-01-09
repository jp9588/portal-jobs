const passport = require('passport');
const Vacantes = require('../models/Vacantes');

exports.authUsuario = passport.authenticate('local', {
	successRedirect: `/administracion`,
	failureRedirect: '/login'
});

exports.checkUsuario = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/login');
};

exports.showPanelAdmin = async (req, res) => {
	const vacantes = await Vacantes.find({ usuario: req.user._conditions._id });
	//console.log(vacantes);
	res.render('panel-admin', {
		nombrePagina: 'Panel de Administracion',
		vacantes
	});
};
