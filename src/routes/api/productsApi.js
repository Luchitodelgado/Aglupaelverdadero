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
            producto.detail = "Link para ver el detalle de usuario"

        })
        productTypes.findAll().then(typeProducts => {

            return res.status(200).json({
                count: productos.length,
                typeProductId: typeProducts,
                productos: resArray,
                status: 200
            })
        })
    })
})

router.get('/api/products/:id', (req, res) => {
    let id = req.params.id
    Product.findAll({
        where: { id: id }
    }).then(function (productos) {
        let resArray = productos.map((producto) => {
            return producto.dataValues;
        })
        resArray.forEach((producto) => {

            producto.detail = "Link para ver el detalle del producto"
        })

        return res.status(200).json({
            property: "Aqui va una propiedad por cada campo en base, preguntar que es?",
            arrayPorRelacionUnoMuchos: "Pregunta bien que es y como lograrlo?",
            urlImagenProducto: "Aqui iria la url al producto (detail)",
            status: 200

        })

    })

})

module.exports = router;

