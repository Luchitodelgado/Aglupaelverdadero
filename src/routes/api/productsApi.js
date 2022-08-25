const { genSaltSync } = require('bcryptjs');
const express = require('express');
const { addListener } = require('nodemon');
const router = express.Router();
const db = require("../../../database/models")
const sequelize = db.sequelize;
const Product = db.Product;
const productTypes = db.Typeproduct

router.get('/api/products', (req, res) => {
    Product.findAll({
    }).then(function (productos) {
        let resArray = productos.map((producto) => {
            return producto.dataValues;
        })
        resArray.forEach((producto) => {
            delete producto.price,
            delete producto.discount,
            delete producto.image,
            delete producto.typeProductId,
            delete producto.stock 
            producto.detail = 'http://localhost:3000/api/products/' + producto.id
        })
        productTypes.findAll().then(typeProducts => {
            return res.status(200).json({
                count: productos.length,
                countByCategory: typeProducts,
                productos: resArray,
                status: 200
            })
        })
    })
})
router.get('/api/products/:id', (req, res) => {
    id = req.params.id
    Product.findAll({
        where: {
            id: id
        }
    }).then(function (products) {
        let resArray = products.map((product) => {
            return product.dataValues;
        })
        resArray.forEach((product) => {
            product.detail = 'http://localhost:3000/img/' + product.image
        })
        return res.status(200).json({
            property: resArray,
            status: 200

        })
    })
})
module.exports = router;

