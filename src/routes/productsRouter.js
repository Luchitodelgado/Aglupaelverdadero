const express = require('express');
const router = express.Router();

const productosController = require('../controllers/productsController');

router.get('/', productosController.productos);

/*** GET ONE PRODUCT ***/
router.get('/detail/:id', productosController.detail);

/**crear producto */
router.get('/create', productosController.create);
router.post('/', productosController.store);
/** */

// EDITAR PRODUCTO

router.get('/:id/edit', )

module.exports = router;