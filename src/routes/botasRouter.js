const express = require('express');
const router = express.Router();

const botasController = require('../controllers/botasController');

router.get('/', botasController.botas);

router.get('/detail/:id', botasController.detail);

/**crear producto */
/* router.get('/create', botasController.create); */
/* router.post('/', botasController.store); */
/** */

module.exports = router;