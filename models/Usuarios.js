const mongoose = require('mongoose');
const crypto = require('crypto');

const usuarioSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	token: {
		type: String
	}
});

const Usuarios = mongoose.model('usuarios', usuarioSchema);

module.exports = Usuarios;
