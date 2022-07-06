const fs = require('fs');
const path = require('path');

const productosFilePath = path.join(__dirname, '../data/productos.json');
const zapatillas = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

const controller = {
	zapatillas: (req, res) => {
        let id = req.params.id
		res.render('zapatillas', {
			zapatillas
		})
	},

    // Detail - Detail from one product
	detail: (req, res) => {
		const zapatillas = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
		let id = req.params.id;
		let product = zapatillas.find(product => product.id == id);
		res.render('detail', {
			product
		})
	},

};


module.exports = controller;