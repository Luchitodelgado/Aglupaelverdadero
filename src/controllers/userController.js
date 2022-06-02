const fs = require('fs');
const path = require('path');

const controller = {
    
	registro: (req,res)=>{
		res.render("registrarte")
	},
	ingresar:(req,res)=>{
		res.render("ingresa")
	},
	carrito:(req,res)=>{
		res.render("carrito")
	}
};

module.exports = controller;
