const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usuarios.json');
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const db = require("../../database/models")
const sequelize = db.sequelize;
const User = db.User;


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
	// DESDE AQUI CON BASE DE DATOS
	store: (req, res) => {
		const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0) {
			return res.render('registrarte', { errors: resultValidation.mapped(), oldData: req.body }),
				console.log('hubo errores', {})
		}
		else
			User.create({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				userName: req.body.userName,
				email: req.body.email,
				birthday: req.body.birthday,
				avatar: req.session.newFileName,
				password: req.body.password,
				typeUserId: 1
				// TYPEUYERID:
				// 0 = STANDARD USER
				// 1 = ADMINISTRATOR
				// 3 = OWNER		

			}),
				res.redirect('/');
	},


	list: (req, res) => {
        db.User.findAll()
            .then(user => {
                res.render('pruebas.ejs', {user})			
            })
			
    },
	create: (req, res) => {
		res.render('ingresa')
	},
	profile: (req, res) => {
		const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
		id = req.params.id
		let usuario = users.find(usuario => usuario.id == id);
		res.render('perfil', { usuario })




		/*  let cssSheets = ["perfil"];
		 let title = "Tu cuenta"; */
		/* res.render("perfil", {cssSheets, title}) */
	}
};


module.exports = controller;