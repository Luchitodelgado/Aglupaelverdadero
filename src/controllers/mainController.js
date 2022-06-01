const fs = require('fs');
const path = require('path');

const controller = {
	index: (req, res) => {

		res.render('home');
	},

	shopMujer:(req,res)=>{
		res.render("shopMujer")
	},
};


module.exports = controller;
