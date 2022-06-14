const express = require('express');
const router = express.Router();

const botasController = require('../controllers/botasController');

router.get('/', botasController.botas);

router.get('/detail/:id', botasController.detail);

module.exports = router;