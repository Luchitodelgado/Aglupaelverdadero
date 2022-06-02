const fs = require('fs');
const path = require('path');

const productosFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

const controller = {
	// Root - Show all products
	productos: (req, res) => {
        let id = req.params.id
		let productos = productos.find(productos => productos.id == id)
		res.render('productos', {
			productos
		})
	}
};

module.exports = controller;