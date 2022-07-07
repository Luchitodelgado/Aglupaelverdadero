/* const fs = require('fs');
const path = require('path');

const productosFilePath = path.join(__dirname, '../data/productos.json');
const borcegos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

const controller = {
	borcegos: (req, res) => {
        let id = req.params.id
		res.render('borcegos', {
			borcegos
		})
	},

  // Detail - Detail from one product
	detail: (req, res) => {
		const borcegos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
		let id = req.params.id;
		let product = borcegos.find(product => product.id == id);
		res.render('detail', {
			product
		})
	},

};

module.exports = controller; */