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
		let emailVerify = req.body.email
		let password = req.body.password
		User.findOne({
			where: {
				email: emailVerify,

			}
		})
			.then(function (usuario) {
				let dbPassword = usuario.password;
				let key = bcryptjs.compareSync(password, dbPassword);
				Humanos.findOne({
					where: {
						email: emailVerify,
						password: key
					}

				}).then(function () {
					if (emailVerify === usuario.email && key == true) {
						req.session.userLogged = usuario;
						res.redirect('/profile')
					}
					else {
						res.render('login', { oldData: req.body }, {
							errors: {
								email: {
									msg: 'No se encuentra este email'
								}
							}
						})
					}
				})

			}).catch((err) => {
				res.render('login', { oldData: req.body }, {
					errors: {
						email: {
							msg: 'No se encuentra este email'
						}
					}
				})

			});
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
				res.render('pruebas.ejs', { user })
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