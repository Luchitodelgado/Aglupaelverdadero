const fs = require('fs');
const path = require('path');
const db = require("../../database/models")
const sequelize = db.sequelize;
const Product = db.Product;


const controller = {
	detail: (req, res) => {
		db.Product.findByPk(req.params.id)
			.then(product => {
				res.render('detail.ejs', { product });
			});
	},
	createProductForm: (req, res) => {
		res.render("crearProducto2")
	},
	create: (req, res) => {
		
		Product.create(
			{
				name: req.body.name,
				description: req.body.description,
				price: req.body.price,
				discount: req.body.discount,
				image: req.session.newFileName,
				stock: 55,
				typeProductId: req.body.category
			}
		)
			.then(() => {
				return res.redirect('/productos')
			})
			.catch(error => res.send(error))
	},
	edit: (req, res) => {
		let products = req.params.id;
		Product.findByPk(products, {
		})
			.then(product => {
				return res.render('editProduct', { product })
			})
	},
	update: (req, res) => {
		let productId = req.params.id;
		Product
			.update({
				id: req.params.id,
				name: req.body.name,
				description: req.body.description,
				price: req.body.price,
				discount: req.body.discount,
				image: req.file.filename,
				category: req.body.category
			}, {
				where: { id: productId }
			}
			).then(() => {
				return res.redirect('/productos')
			})
			.catch(error => res.send(error))
	},
	destroy: (req, res) => {
		let productId = req.params.id;
		Product.destroy({ where: { id: productId }, force: true })
			.then(() => {
				return res.redirect('/productos')
			})
			.catch(error => res.send(error))
	},
	carrito: (req, res) => {
		res.render('carrito')
	},
	productos: (req, res) => {
		res.render('productos')
	},
	productList: (req, res) => {

		const listar = req.params.id
		if (listar == "texanas") {
			Product.findAll({
				where: {
					typeProductId: 1
				}
			}).then(function (productos) {
				res.render("productList", { productos })
			})
		}
		else if (listar == "botas") {
			Product.findAll({
				where: {
					typeProductId: 2
				}
			}).then(function (productos) {
				res.render("productList", { productos })
			})
		}
		else if (listar == "borcegos") {
			Product.findAll({
				where: {
					typeProductId: 3
				}
			}).then(function (productos) {

				res.render("productList", { productos })
			})
		}
		else if (listar == "zapatillas") {
			Product.findAll({
				where: {
					typeProductId: 4
				}
			}).then(function (productos) {

				res.render("productList", { productos })
			})
		}
		console.log(req.session.userLogged)
	},

};

module.exports = controller;