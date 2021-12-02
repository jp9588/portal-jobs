const express = require('express');

const homeController = require('../controllers/homeController');
const vacantesController = require('../controllers/vacantesController');

const router = express.Router();

module.exports = () => {
	router.get('/', homeController.mostrarTrabajos);
	router.get('/vacantes/nueva', vacantesController.crearVacante);
	router.post('/vacantes/nueva', vacantesController.guardarVacante);
	router.get('/vacantes/info/:id', vacantesController.mostrarVacante);
	router.get('/vacante/editar/:id', vacantesController.editarVacante);
	router.post('/vacante/editar/:id', vacantesController.actualizarVacante);

	return router;
};
