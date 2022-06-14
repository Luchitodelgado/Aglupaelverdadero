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
    create: (req, res) =>{
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
			image: "default-image.png",
			category: req.body.category
	}
	products.push(newProduct);
	fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
	res.redirect("/productos");
},

};

module.exports = controller;