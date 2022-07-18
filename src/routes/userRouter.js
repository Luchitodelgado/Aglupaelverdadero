const express = require('express');
const router = express.Router();
const multer = require ('multer');
const path = require('path');
const controller = require('../controllers/usersController');
const {check} = require('express-validator');

const userController = require('../controllers/usersController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/img/img-usuarios"));
    },
    filename: (req,file, cb) => {
        console.log(file);
        const newFilename = "usuario" + Date.now() + path.extname(file.originalname);
        cb (null, newFilename);
    }
});

const upload = multer ({storage})
const validacion= [
    
        check('email').isEmail().withMessage('Email inválido'),
        check('password').isLength({min:8}).withMessage('La contraseña debe tener al menos 8 caracteres')
]
router.get("/registrarte", userController.registro);
router.get("/ingresa", userController.ingresa);
router.post("/ingresa",validacion,userController.processLogin);
router.post('/users', upload.single("usuario"), userController.store);
router.get('/users', userController.create )

// VER PERFIL
router.get("/perfil", userController.profile);

module.exports = router;
