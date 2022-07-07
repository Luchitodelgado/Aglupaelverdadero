const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usuarios.json');


const controller = {

	registro: (req, res) => {
		res.render("registrarte")
	},
	ingresa: (req, res) => {
		res.render("ingresa")
	},

	// Create -  Method to store
	store: (req, res) => {
		/* res.send("Producto nuevo agregado"); */
		const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
		let newUser = {
			nombreapellido: req.body.nombreapellido,
			nombreuser: req.body.nombreuser,
			email: req.body.email,
			fechadenacimiento: req.body.fechadenacimiento,
			avatar:req.file.filename,
			password: req.body.password,
		}
		users.push(newUser);
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
		res.redirect("/ingresa");
	},
	create: (req, res) => {
		res.render('crearProducto')
	}
};

module.exports = controller;
