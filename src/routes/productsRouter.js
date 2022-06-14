const express = require('express');
const router = express.Router();

const productosController = require('../controllers/productsController');

router.get('/', productosController.productos);

/*** GET ONE PRODUCT ***/
router.get('/detail/:id', productosController.detail);

module.exports = router;