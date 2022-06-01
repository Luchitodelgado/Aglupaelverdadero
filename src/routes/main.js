
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
router.get('/', mainController.index); 
router.get("/shopMujer", mainController.shopMujer)
router.get("/productos", mainController.productos)
module.exports = router;
