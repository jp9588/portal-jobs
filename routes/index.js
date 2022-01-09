const express = require('express');

const homeController = require('../controllers/homeController');
const usuariosController = require('../controllers/usuariosController');
const vacantesController = require('../controllers/vacantesController');
const authController = require('../controllers/authController');
const router = express.Router();

module.exports = () => {
	router.get('/', homeController.mostrarTrabajos);

	router.get('/usuario/crear-nuevo', usuariosController.crearNuevoUsuario);
	router.post('/usuario/crear-nuevo', usuariosController.guardarNuevoUsuario);

	router.get('/login', usuariosController.loginForm);
	router.post('/usuario/login', authController.authUsuario);

	router.get('/administracion', authController.checkUsuario, authController.showPanelAdmin);

	router.get('/vacantes/nueva', authController.checkUsuario, vacantesController.crearVacante);
	router.post('/vacantes/nueva', authController.checkUsuario, vacantesController.guardarVacante);
	router.get('/vacantes/info/:id', authController.checkUsuario, vacantesController.mostrarVacante);
	router.get('/vacante/editar/:id', authController.checkUsuario, vacantesController.editarVacante);
	router.post('/vacante/editar/:id', authController.checkUsuario, vacantesController.actualizarVacante);

	//perfil del usuario
	router.get('/usuario/editar-perfil', authController.checkUsuario, usuariosController.editarPerfilForm);
	router.post('/usuario/editar-perfil', authController.checkUsuario, usuariosController.guardarCambiosEnPerfil);

	return router;
};
