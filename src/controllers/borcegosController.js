const fs = require('fs');
const path = require('path');

const borcegosFilePath = path.join(__dirname, '../data/borcegos.json');
const borcegos = JSON.parse(fs.readFileSync(borcegosFilePath, 'utf-8'));

const controller = {
	borcegos: (req, res) => {
        let id = req.params.id
		res.render('borcegos', {
			borcegos
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