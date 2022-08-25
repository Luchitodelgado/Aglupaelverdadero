const express = require('express');
const router = express.Router();
const db = require("../../../database/models")
const sequelize = db.sequelize;
const Product = db.Product;
const productTypes = db.Typeproduct

router.get('/api/stats', (req, res) => {
    Product.findAll({
    }).then(function (productos) {
        let resArray = productos.map((producto) => {
            return producto.dataValues;
        })
        /*         resArray.forEach((producto) => {
                    producto.count = productos.length
        
        
                
                }) */
        productTypes.findAll().then(typeProducts => {
            return res.status(200).json({
                stats: {
                    totalProducts: productos.length,
                    totalCategories: typeProducts.length,
                    status: 200
                }
            })
        })
    })
})


module.exports = router;

