const fs = require('fs');
const path = require('path');
const db = require("../../database/models")
const Sequelize = require ('sequelize')
const sequelize = db.sequelize;
const Product = db.Product;
const { Op } = require("sequelize")

const controller = {
	index: (req, res) => {
		Product.findAll({
			where: {
				discount: {
					[Op.between]: [20, 90]
				}
			}

		}).then(function (productos) {



			return res.render('home', { productos })
		})

	},

};


module.exports = controller;
