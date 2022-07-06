const express = require('express');
const router = express.Router();
const multer = require ('multer');

const productosController = require('../controllers/productsController');

router.get('/', productosController.productos);
router.get("/", productosController.productos);
router.get('/', productosController.productos);
router.get("/", productosController.productos);


/*** GET ONE PRODUCT ***/
router.get('/detail/:id', productosController.detail);

/**crear productos */
router.get('/create', productosController.create);
router.post('/', productosController.store);

/**Edicion productos*/
router.get('/edit/:id', productosController.edit);
router.patch('/edit/:id', productosController.update);

/* borrar producto */
router.delete('/delete/:id', productosController.destroy);



module.exports = router;