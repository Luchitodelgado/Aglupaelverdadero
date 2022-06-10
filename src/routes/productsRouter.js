const express = require('express');
const router = express.Router();

const productosController = require('../controllers/productsController');

router.get('/', productosController.productos);

module.exports = router;