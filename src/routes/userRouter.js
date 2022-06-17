const express = require('express');
const router = express.Router();
const multer = require ('multer');

const userController = require('../controllers/usersController');

router.get("/registrarte", userController.registro)
router.get("/ingresa", userController.ingresar)
router.post('/users', userController.store);
router.get('/users', userController.create )
module.exports = router;
