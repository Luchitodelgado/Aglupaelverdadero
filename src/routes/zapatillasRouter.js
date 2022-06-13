const express = require('express');
const router = express.Router();

const zapatillasController = require('../controllers/zapatillasController');

router.get('/', zapatillasController.zapatillas);

module.exports = router;