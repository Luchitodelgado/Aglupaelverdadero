const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usuarios.json');


const controller = {

	registro: (req, res) => {
		res.render("registrarte")
	},
	ingresar: (req, res) => {
		res.render("ingresa")
	},

	// Create -  Method to store
	store: (req, res) => {
		/* res.send("Producto nuevo agregado"); */
		const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
		let newUser = {		
			name: req.body.name,			
			description: req.body.description,
			price: req.body.price,
			discount: req.body.discount,
			image: "image.png",
			category: req.body.category
		}
		products.push(newUser);
		fs.writeFileSync(usersFilePath, JSON.stringify(products, null, " "));
		res.redirect("/ingresa");
	},
	create: (req, res) => {
		res.render('crearProducto')
	}
};

module.exports = controller;
