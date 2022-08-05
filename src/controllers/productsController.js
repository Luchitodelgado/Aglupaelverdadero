const fs = require('fs');
const path = require('path');
const db = require("../../database/models")
const sequelize = db.sequelize;
const Product = db.Product;
/* 
const productosFilePath = path.join(__dirname, '../data/productos.json'); */


const controller = {
	detail: (req, res) => {
		db.Product.findByPk(req.params.id)
			.then(product => {
				res.render('detail.ejs', { product });
			});
	},
	createProductForm: (req, res) => {
		res.render("crearProducto")
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
				typeProductId: 1
			}
		)
			.then(() => {
				return res.redirect('/productos')
			})
			.catch(error => res.send(error))
	},
	store: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
		let newProduct = {
			id: products[products.image - 1].id + 1,
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			discount: req.body.discount,
			image: req.file.filename,
			category: req.body.category
		}
		products.push(newProduct);
		fs.writeFileSync(productosFilePath, JSON.stringify(products, null, " "));
		res.redirect("/productos");
	},
	edit: (req, res) => {
		let products = req.params.id;
		Product.findByPk(products, {
		})
			.then(product => {
				return res.render('product-edit-form', { product })
			})
	},
	update: (req, res) => {
		const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
		let productosToEdit = productos.find(productos => req.params.id == productos.id);

		let editedProductos = {
			id: req.params.id,
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			discount: req.body.discount,
			image: req.file.filename,
			category: req.body.category
		}

		let indice = productos.findIndex(productos => productos.id == req.params.id);
		productos[indice] = editedProductos;

		fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "));
		res.redirect("/productos");
	},

	destroy: (req, res) => {
		let productId = req.params.id;
        Product.destroy({where: {id: productId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(()=>{
            return res.redirect('/productos')})
        .catch(error => res.send(error))


	},
	carrito: (req, res) => {
	
		res.render('carrito')
	},
	productos: (req, res) => {
		res.render('productos')
	},
	search: (req, res) => {
		res.send('hola')
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