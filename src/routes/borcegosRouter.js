const express = require('express');
const router = express.Router();

const borcegosController = require('../controllers/borcegosController');

router.get('/borcegos', borcegosController.borcegos);

module.exports = router;