const Vacantes = require('../models/Vacantes');

exports.crearVacante = (req, res) => {
	res.render('nueva-vacante', {
		nombrePagina: 'Nueva Vacante'
	});
};

exports.guardarVacante = async (req, res) => {
	const { titulo, empresa, ubicacion, salario, contrato, descripcion } = req.body;

	await Vacantes.create({ titulo, empresa, ubicacion, salario, contrato, descripcion });

	res.redirect('/');
};

exports.mostrarVacante = async (req, res, next) => {
	const vacante = await Vacantes.findById({ _id: req.params.id });

	if (!vacante) {
		next();
	}

	res.render('vacante', {
		nombrePagina: `Vacante: ${vacante.titulo}`,
		vacante
	});
};

exports.editarVacante = async (req, res) => {
	const contratos = [ 'tiempo completo', 'medio tiempo', 'freelance', 'por contrato' ];
	const vacante = await Vacantes.findById({ _id: req.params.id });
	//console.log(vacante);
	res.render('editar-vacante', {
		nombrePagina: `Editar la Vacante: ${vacante.titulo}`,
		vacante,
		contratos
	});
};

exports.actualizarVacante = async (req, res) => {
	const { titulo, empresa, ubicacion, salario, descripcion, contrato } = req.body;
	const vacante = await Vacantes.findById({ _id: req.params.id });

	vacante.titulo = titulo;
	vacante.empresa = empresa;
	vacante.ubicacion = ubicacion;
	vacante.salario = salario;
	vacante.descripcion = descripcion;
	vacante.contrato = contrato;

	await vacante.save();

	res.redirect('/');
};
