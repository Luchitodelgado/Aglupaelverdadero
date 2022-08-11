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
		res.locals.mailEnUso = false
		res.render("registrarte2")
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

				if (!usuario) {
					console.log('el mail no se encuentra')
					return res.render('ingresa', { message: "There is no record of the email" })
				}
				else {
					console.log('logeaste')
					let dbPassword = usuario.password;
					let key = bcryptjs.compareSync(password, dbPassword)

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
						else if (emailVerify === usuario.email && key == false) {
							res.render('ingresa', { oldData: req.body }, {
								errors: {
									email: {
										msg: 'password incorrecta'
									}
								}
							})
						}
						else if (usuario.email == undefined) {
							res.render("ingresa", { oldData: req.body }, {
								errors: {
									email: {
										msg: 'email incorrecta'
									}
								}
							})
						}
						else if (usuario == null || password == null) {
							res.render('ingresa')
						}
					})

				}
			}).catch((err) => {
				console.log("este es el error: " + err)
				res.render('ingresa', { oldData: req.body }, {
					errors: {
						email: {
							msg: 'No se encuentra este email'
						}
					}
				})
			});
	},
	store: (req, res) => {
		let emailVerify = req.body.email
		User.findOne({
			where: {
				email: emailVerify,
			}
		}).then(function (usuario) {
			const resultValidation = validationResult(req);
			if (resultValidation.errors.length > 0) {
				res.render('registrarte2', { errors: resultValidation.mapped(), oldData: req.body })
			}
			else if (emailVerify === usuario.email) {
				res.locals.mailEnUso = true

				return res.render('registrarte2', { oldData: req.body })
			}
			/* 			else
							console.log('aqui estas')
						User.create({
							firstName: req.body.firstName,
							lastName: req.body.lastName,
							email: req.body.email,
							birthday: req.body.birthday,
							phone: req.body.phone,
							avatar: req.session.newFileName,
							password: bcryptjs.hashSync(req.body.password, 10),
							typeUserId: 1
			
							// TYPEUYERID:				
							// 1 = REGISTERED USER
							// 2 = ADMINISTRATOR
							//3 = OWNER
			
						}),
							res.redirect('/'); */

		}).catch(() => {
			User.create({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				birthday: req.body.birthday,
				phone: req.body.phone,
				avatar: req.session.newFileName,
				password: bcryptjs.hashSync(req.body.password, 10),
				typeUserId: 1
				// TYPEUYERID:				
				// 1 = REGISTERED USER
				// 2 = ADMINISTRATOR
				//3 = OWNER
			}),
				res.redirect('/');
		});
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