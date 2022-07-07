const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usuarios.json');


const controller = {

	registro: (req, res) => {
		res.render("registrarte")
	},
	ingresa: (req, res) => {
		res.render("ingresa")
	},
	processLogin: function(req,res){
		let errors = validationResult(req);

		if(errors.isEmpty()){
		
		for (let i = 0; i < users.length; i++){
			if (users[i].email == req.body.email){
				if(bcrypt.compareSync(req.body.password, users[i].password)){
					let usuarioALoguearse = users[i];
				}
			}
		}
		if(usuarioALoguearse == undefined){
			return res.render('login',{errors: [
				{msg:"Credenciales invalidas"}
			]});
		}
		req.session.usuarioLogueado = usuarioALoguearse;
		res.render("sucess");
		}else{
			return res.render("ingresa",{errors: errors.errors});
		}
	},
	// Create -  Method to store
	store: (req, res) => {
		/* res.send("Producto nuevo agregado"); */
		const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
		let newUser = {
			nombreapellido: req.body.nombreapellido,
			nombreuser: req.body.nombreuser,
			email: req.body.email,
			fechadenacimiento: req.body.fechadenacimiento,
			avatar:req.file.filename,
			password: req.body.password,
		}
		users.push(newUser);
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
		res.redirect("/ingresa");
	},
	create: (req, res) => {
		res.render('crearProducto')
	}
};

module.exports = controller;
