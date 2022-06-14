const express = require('express');
const router = express.Router();

const borcegosController = require('../controllers/borcegosController');

router.get('/', borcegosController.borcegos);

router.get('/detail/:id', borcegosController.detail);

/**crear producto */
/* router.get('/create', borcegosController.create); */
/* router.post('/', borcegosController.store); */


module.exports = router;