const express = require('express');
const router = express.Router();

const borcegosController = require('../controllers/borcegosController');

router.get('/', borcegosController.borcegos);

router.get('/detail/:id', borcegosController.detail);

module.exports = router;