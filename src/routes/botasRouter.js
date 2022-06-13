const express = require('express');
const router = express.Router();

const botasController = require('../controllers/botasController');

router.get('/', botasController.botas);

module.exports = router;