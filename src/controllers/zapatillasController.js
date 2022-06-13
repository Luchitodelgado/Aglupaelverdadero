const fs = require('fs');
const path = require('path');

const zapatillasFilePath = path.join(__dirname, '../data/zapatillas.json');
const zapatillas = JSON.parse(fs.readFileSync(zapatillasFilePath, 'utf-8'));

const controller = {
	zapatillas: (req, res) => {
        let id = req.params.id
		res.render('zapatillas', {
			zapatillas
		})
	},

    detail: (req, res) => {
		let id = req.params.id;
		res.render('detail', {
			product
		})
	},

};

module.exports = controller;