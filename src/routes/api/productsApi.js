const express = require('express');
const router = express.Router();
const db = require("../../../database/models")
const sequelize = db.sequelize;
const Product = db.Product;
const productTypes = db.Typeproduct


router.get('/api/products', (req, res) => {

    //Select categoryname, count(*) from  typeproducts group by  categoryname

    Product.findAll({
    }).then(function (productos) {
        let texana = []
        let botas = []
        let borcegos = []
        let zapatillas = []


        let categoriesArray = productos.map((category) => {
            if (category.typeProductId === 1) {
                texana.push(category.typeProductId)
                console.log('texana')
            }
            else if (category.typeProductId === 2) {
                console.log('Botas')
                botas.push(category.typeProductId)
            }
            else if (category.typeProductId === 3) {
                console.log('borcegos')
                borcegos.push(category.typeProductId)
            }
            else if (category.typeProductId === 4) {
                console.log('zapatillas')
                zapatillas.push(category.typeProductId)
            }
        })
        console.log(texana)
        console.log(botas)
        console.log(borcegos)
        console.log(zapatillas)

            let cantidadPorCategoria={
                texana: texana.length,
                botas: botas.length,
                borcegos: borcegos.length,
                zapatillas: zapatillas.length
            }
        let resArray = productos.map((producto) => {
          
            return producto.dataValues;
            
        })
        resArray.forEach((producto) => {
            delete producto.typeProductId,
                delete producto.price,
                delete producto.stock,
                delete producto.discount,
                producto.image = 'http://localhost:3001/img/' + producto.image
            producto.detail = 'http://localhost:3000/api/products/' + producto.id
        })
        productTypes.findAll()
            .then(typeProducts => {
                if (typeProducts.id === 3) {
                    console.log('array:  ' + typeProducts.id)
                }

                return res.status(200).json({
                    count: productos.length,
                    countByCategory: cantidadPorCategoria,
                    productos: resArray,
                    status: 200
                })
            });


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

