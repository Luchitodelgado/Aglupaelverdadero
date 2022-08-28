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
					return res.render('ingresa', {
						errors: {
							email: {
								msg: "Datos incorrectos."
							}
						}
					})
				}
				else {
					let dbPassword = usuario.password;
					let key = bcryptjs.compareSync(password, dbPassword)

					User.findOne({
						where: {
							email: emailVerify,
							password: key
						}

						// EL USUARIO LOGUEA
					}).then(function () {
						if (emailVerify === usuario.email && key == true) {
							res.locals.isLogged = true
							req.session.userLogged = usuario;

							if (usuario.typeUserId === 2) {
								req.session.userAdmin = usuario
								console.log(usuario.typeUserId)
							}

							res.redirect('/perfil')

						}
						else if (emailVerify === usuario.email && key == false) {
							res.render('ingresa', {
								errors: {
									password: {
										msg: "Contraseña incorrecta."
									}
								}
							})
						}
					})
				}
			}).catch((err) => {
				console.log("este es el error mas de abajo: " + err)
				res.render('ingresa', { oldData: req.body }, {
					errors: {
						email: {
							msg: err
						}
					}
				})
			});
	},
	store: (req, res) => {
		const emailVerify = req.body.email
		let buscarUsuario = User.findAll({
			where: {
				email: req.body.email,
			}
		}).then(function (usuario) {
			if (usuario != ""){
				res.locals.mailEnUso = true
				return res.render('registrarte2')
			}

			const resultValidation = validationResult(req);
			if (resultValidation.errors.length > 0) {
				res.render('registrarte2', { errors: resultValidation.mapped(), oldData: req.body })
			}
			else if (emailVerify === usuario.email) {
				res.locals.mailEnUso = true

				return res.render('registrarte2', { oldData: req.body })
			}
			else {/* if (emailVerify != usuario.email && res.locals.mailEnUso === false) */

				User.create({
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: emailVerify,
					birthday: req.body.birthday,
					phone: req.body.phone,
					avatar: req.session.newFileName,
					password: bcryptjs.hashSync(req.body.password, 10),
					typeUserId: 2

					// TYPEUYERID:				
					// 1 = REGISTERED USER
					// 2 = ADMINISTRATOR
					//3 = OWNER

				}),
					res.redirect('/');
			}

		}).catch((err) => {
			console.log("este es el error: " + err)
		})


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

	profileEdit: (req, res) => {
		res.render('profileEdit')

	},
	editProfile: (req, res) => {
		let userId = req.params.id;

		User
			.update({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				phone: req.body.phone,
				avatar: req.session.newFileName,
				password: bcryptjs.hashSync(req.body.password, 10)
			},
				{
					where: { id: userId }
				}
			).then(() => {
				return res.redirect('/perfil')
			})
			.catch(error => res.send(error))

	},
	salir: (req, res) => {
		req.session.destroy();
		res.redirect('/')
	}
};
module.exports = controller;