const fs = require('fs');
const path = require('path');

const botasFilePath = path.join(__dirname, '../data/botas.json');
const botas = JSON.parse(fs.readFileSync(botasFilePath, 'utf-8'));

const controller = {
	botas: (req, res) => {
        let id = req.params.id
		res.render('botas', {
			botas
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