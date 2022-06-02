const express = require('express');
const router = express.Router();

const productosController = require('../controllers/productosController');

router.get('/productos', productosController.index);

module.exports = router;