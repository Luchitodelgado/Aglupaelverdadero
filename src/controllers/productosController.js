const fs = require('fs');
const path = require('path');

const productosFilePath = path.join(__dirname, '../data/productos.json');


const controller = {
	// Root - Show all products
	index: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
		res.render('productos', {
			products
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
		let id = req.params.id;
 
		res.render('detail', {
			product
		})
	},
};

module.exports = controller;