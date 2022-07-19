const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usuarios.json');
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')


const controller = {

	registro: (req, res) => {
		res.render("registrarte")
	},
	ingresa: (req, res) => {
		res.render("ingresa")
	},
	processLogin: function (req, res) {
		let users = usersFilePath;
		let errors = validationResult(req);
		let usuarioAloguearse;


		if (errors.isEmpty()) {

			for (let i = 0; i < users.length; i++) {
				if (users[i].email == req.body.email) {
					if (bcrypt.compareSync(req.body.password, users[i].password2)) {
						usuarioAloguearse = users[i];
						console.log('accediste')
						console.log(usuarioAloguearse);
					}
				}
			}
			if (usuarioAloguearse == undefined) {
				console.log('incorrecto')
				return res.render('home', {
					errors: [
						{ msg: "Credenciales invalidas" }
					]
			
				});
			}
			req.session.usuarioLogueado = usuarioAloguearse;
			
		} else {
			return res.render("home", { errors: errors.errors });
		}
	},
	// Create -  Method to store
	store: (req, res) => {
		let pass = bcrypt.hashSync(req.body.password2, 10);

		const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
		let newUser = {
			nombreapellido: req.body.nombreapellido,
			nombreuser: req.body.nombreuser,
			email: req.body.email,
			fechadenacimiento: req.body.fechadenacimiento,
			avatar: req.file.filename,
			password2: pass

		}
		users.push(newUser);
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
		res.redirect("/ingresa");
	},
	create: (req, res) => {
		res.render('ingresa')
	},

};


module.exports = controller;