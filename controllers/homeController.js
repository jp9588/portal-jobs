const Vacantes = require('../models/Vacantes');

exports.mostrarTrabajos = async (req, res) => {
	const vacantes = await Vacantes.find({});

	res.render('home', {
		nombrePagina: 'Portal Jobs',
		crearNuevaVacante: true,
		vacantes
	});
};
