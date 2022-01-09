const Usuarios = require('../models/Usuarios');
const bcrypt = require('bcryptjs');
const Vacantes = require('../models/Vacantes');

exports.crearNuevoUsuario = (req, res) => {
	res.render('crea-usuario-form', {
		nombrePagina: 'Crea tu usuario en Portal Jobs'
	});
};

exports.guardarNuevoUsuario = async (req, res) => {
	let { nombre, email, password } = req.body;

	const usuarioExiste = await Usuarios.findOne({ email: email });

	if (!usuarioExiste) {
		password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

		const usuario = await Usuarios.create({ name: nombre, email, password, token: '' });
		//console.log(usuario);

		res.redirect('/login');
	}

	res.render('crea-usuario-form', {
		nombrePagina: 'Crea tu usuario en Portal Jobs',
		errors: [ { msg: 'El Usuario ya existe en esta plataforma' } ]
	});
};

exports.loginForm = (req, res) => {
	res.render('login', {
		nombrePagina: 'Sign In'
	});
};

exports.authUser = async (req, res) => {
	const { email, password } = req.body;

	const usuarioExiste = await Usuarios.findOne({ email: email });

	if (!usuarioExiste) {
		res.render('login', {
			nombrePagina: 'Sing In',
			errors: [ { msg: 'Usuario o password Incorrectos' } ]
		});
	}
	const isValid = bcrypt.compareSync(password, usuarioExiste.password);

	if (!isValid) {
		res.render('login', {
			nombrePagina: 'Sing In',
			errors: [ { msg: 'Usuario o password Incorrectos' } ]
		});
	}

	const vacantes = await Vacantes.find({});

	res.render('home', {
		nombrePagina: 'Portal Jobs',
		crearNuevaVacante: true,
		vacantes,
		rutaBtn: `/vacantes/nueva`,
		usuario: usuarioExiste
	});
};

exports.editarPerfilForm = async (req, res) => {
	const usuario = await Usuarios.findOne({ _id: req.user._conditions._id });
	res.render('editar-perfil', {
		nombrePagina: 'Edita tu perfil en PortalJobs',
		usuario
	});
};

exports.guardarCambiosEnPerfil = async (req, res) => {
	let { nombre, email, password } = req.body;

	const usuario = await Usuarios.findOne({ _id: req.user._conditions._id });

	try {
		if (!password) {
			usuario.name = nombre;
			usuario.email = email;
		} else {
			usuario.name = nombre;
			usuario.email = email;
			usuario.password = password;
		}

		await usuario.save();

		res.redirect('/administracion');
	} catch (error) {
		console.log(error);
		res.render('/usuario/editar-perfil', {
			nombrePagina: 'Edita tu perfil en PortalJobs',
			error: 'Hubo un error al actualizar el perfil'
		});
	}
};
