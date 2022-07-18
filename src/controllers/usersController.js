const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usuarios.json');
const {validationResult}=require('express-validator')
const bcrypt =require('bcrypt')


const controller = {

	registro: (req, res) => {
		res.render("registrarte")
	},
	ingresa: (req, res) => {
		res.render("ingresa")
	},
	processLogin: function(req,res){
		let users = usersFilePath;
		let errors = validationResult(req);
		let usuarioAloguearse;
		if(errors.isEmpty()){
		
		for (let i = 0; i < users.length; i++){
			if (users[i].email == req.body.email){
				if(bcrypt.compareSync(req.body.password, users[i].password)){
				 usuarioAloguearse = users[i];
				}
			}
		}
		if(usuarioAloguearse == undefined){
			return res.render('home',{errors: [
				{msg:"Credenciales invalidas"}
			]});
		}
		req.session.usuarioLogueado = usuarioAloguearse;
		res.redirect("/");
		}else{
			return res.render("/",{errors: errors.errors});
		}
		console.log(usuarioAloguearse);
	},
	// Create -  Method to store
	store: (req, res) => {

		const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
		let newUser = {
			nombre: req.body.nombre,
			apellido: req.body.apellido,
			nombreuser: req.body.nombreuser,
			email: req.body.email,
			fechadenacimiento: req.body.fechadenacimiento,
			avatar:req.file.filename,
			password: bcrypt.hashSync(req.body.password, 10)
		}
		users.push(newUser);
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
		res.redirect("/ingresa");
	},
	create: (req, res) => {
		res.render('ingresa')
	},
	profile: (req,res) => {
		/* const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
		/* let id = req.params.id; */
		/*let usuario = users.find(usuario => usuario.id == id); */
		res.render('perfil')
       /*  let cssSheets = ["perfil"];
        let title = "Tu cuenta"; */
        /* res.render("perfil", {cssSheets, title}) */
    }
};

module.exports = controller;