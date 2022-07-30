const fs = require('fs');
const path = require('path');
const db = require("../../database/models")
const sequelize = db.sequelize;
const Product = db.Product;

const productosFilePath = path.join(__dirname, '../data/productos.json');


const controller = {
	texanas: (req, res) => {
		Product.findAll({
			where: {
				typeProductId: 1
			}
		}).then(function (texanas) {
			res.render("texanas", { texanas })
		})
	},
	borcegos: (req, res) => {
		Product.findAll({
			where: {
				typeProductId: 3
			}
		}).then(function (borcegos) {
			res.render("borcegos", { borcegos })
		})
	},
	botas: (req, res) => {
		Product.findAll({
			where: {
				typeProductId: 2
			}
		}).then(function (botas) {
			res.render("botas", { botas })
		})
	},
	zapatillas: (req, res) => {
		Product.findAll({
			where: {
				typeProductId: 4
			}
		}).then(function (zapatillas) {
			res.render("zapatillas", { zapatillas })
		})
	},
	detail: (req, res) => {
		db.Product.findByPk(req.params.id)
			.then(product => {
				res.render('detail.ejs', { product });
			});
	},
	createProductForm: (req,res)=>{
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
				typeProductId :1
            }
        )
        .then(()=> {
            return res.redirect('/productos')})            
        .catch(error => res.send(error))
    },



store: (req, res) => {
	/* res.send("Producto nuevo agregado"); */
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
		const products = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
		let id = req.params.id
		let productToEdit = products.find(product => product.id == id)
		res.render('product-edit-form', { productToEdit })
	},
		// Update - Method to update
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
				const products = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

				let finalProducts = products.filter(product => product.id != req.params.id);
				fs.writeFileSync(productosFilePath, JSON.stringify(finalProducts, null, " "));

				res.redirect("/productos");
			},
				carrito: (req, res) => {
					const products = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
					res.render('carrito')
				},
					productos: (req, res) => {
						res.render('productos')
					},
						search: (req, res) => {


							res.send('hola')
						}




};

module.exports = controller;