
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.get("/registrarte", userController.registro)
router.get("/ingresa", userController.ingresar)
router.get("/carrito", userController.carrito)
module.exports = router;
