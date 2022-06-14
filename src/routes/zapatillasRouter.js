const express = require('express');
const router = express.Router();

const zapatillasController = require('../controllers/zapatillasController');

router.get('/', zapatillasController.zapatillas);

router.get('/detail/:id', zapatillasController.detail);

/**Crear producto */
/* router.get('/create', zapatillasController.create); */
/* router.post('/', zapatillasController.store); */
/** */

module.exports = router;