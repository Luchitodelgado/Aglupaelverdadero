const fs = require('fs');
const path = require('path');

const productosFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));



const controller = {
	// Root - Show all products
	productos: (req, res) => {
		let id = req.params.id
		res.render('productos', {
			productos
		})
	},


	// Detail - Detail from one product
	detail: (req, res) => {
		const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
		let id = req.params.id;
		let product = productos.find(product => product.id == id);
		res.render('detail', {
			product
		})
	},
	//*crear fromulario crear//
	create: (req, res) => {
		res.render('crearProducto')
	},

	// Create -  Method to store
	store: (req, res) => {
		/* res.send("Producto nuevo agregado"); */
		const products = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
		let newProduct = {
			id: products[products.length - 1].id + 1,
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
	}




};

module.exports = controller;