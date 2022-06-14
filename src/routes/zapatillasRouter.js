const express = require('express');
const router = express.Router();

const zapatillasController = require('../controllers/zapatillasController');

router.get('/', zapatillasController.zapatillas);

router.get('/detail/:id', zapatillasController.detail);

module.exports = router;