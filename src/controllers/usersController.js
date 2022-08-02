const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usuarios.json');
const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
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
				User.findOne({
					where: {
						email: emailVerify,
						password: key
					}

				}).then(function () {
					if (emailVerify === usuario.email && key == true) {
						res.locals.isLogged = true
						req.session.userLogged = usuario;			
						res.locals.usuario = usuario;		
						res.redirect('/perfil')
					
					}
					else {
						res.render('ingresa', { oldData: req.body }, {
							errors: {
								email: {
									msg: 'No se encuentra este email'
								}
							}
						})
					}
				})

			}).catch((err) => {
				console.log(err)
				res.render('ingresa', { oldData: req.body }, {
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
			return res.render('registrarte', { errors: resultValidation.mapped(), oldData: req.body })

		}
		else
			User.create({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				birthday: req.body.birthday,
				avatar: req.session.newFileName,
				password: bcryptjs.hashSync(req.body.password, 10),
				/* 	password: req.body.password, */
				typeUserId: 1
				// TYPEUYERID:
				// 0 = STANDARD USER
				// 1 = ADMINISTRATOR
				// 2 = OWNER		

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
	userProfile: (req, res) => {
		if (req.session.userLogged) {
			console.log(req.session.userLogged)
			res.render('perfil', { usuario: req.session.userLogged });

		}
		else
			res.render("ingresa")

	},

	salir: (req, res) => {
		req.session.destroy();
		res.redirect('/')
	}


};
module.exports = controller;