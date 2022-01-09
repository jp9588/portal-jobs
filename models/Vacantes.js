const mongoose = require('mongoose');

const vacanteSchema = mongoose.Schema({
	titulo: {
		type: String,
		required: true,
		trim: true
	},
	empresa: {
		type: String,
		trim: true
	},
	ubicacion: {
		type: String,
		trim: true,
		required: true
	},
	salario: {
		type: String,
		required: true
	},
	descripcion: {
		type: String,
		required: true,
		trim: true
	},
	contrato: {
		type: String,
		required: true,
		trim: true
	},
	usuario: {
		type: String,
		required: true
	}
});

const Vacantes = mongoose.model('vacante', vacanteSchema);

module.exports = Vacantes;
