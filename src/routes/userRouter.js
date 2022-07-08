const express = require('express');
const router = express.Router();
const multer = require ('multer');
const path = require('path');
const bcrypt = require('bcryptjs');

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

router.get("/registrarte", userController.registro);
router.get("/ingresa", userController.ingresa);
router.post('/ingresa',userController.processLogin);
router.post('/users', upload.single("usuario"), userController.store);
router.get('/users', userController.create )

module.exports = router;
