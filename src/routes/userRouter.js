const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const controller = require('../controllers/usersController');
const { check } = require('express-validator');
const userController = require('../controllers/usersController');
const userMiddleware= require('../middlewares/userMiddleware')
const guestMiddleware= require('../middlewares/guestMiddleware')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/img/img-usuarios"));
    },
    filename: (req, file, cb) => {
        console.log(file);
        const newFilename = "usuario" + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
        req.session.newFileName = newFilename
    }
});

const upload = multer({ storage })

const validations=[
    check('firstName').notEmpty().isLength({min:3, max:15}).withMessage('minimo 3 caracteres, maximo 12.').bail(),
    check('lastName').notEmpty().isLength({min:3, max:20}).withMessage('minimo 3 caraceres, maximo 12.').bail(),
    check('email').notEmpty().isLength({min:3, max:50}).isEmail().withMessage('Ingrese un Email valido').bail(),
    check('password').notEmpty().isLength({min:7, max:16}).withMessage('ingrese una passowrd').bail(),
    check('birthday').notEmpty().isDate().withMessage('El formato de fecha no es correcto').bail()
]

router.get("/registrarte",userController.registro);
router.get("/ingresa",userController.ingresa);
router.post("/login", validations,userController.processLogin);
router.post('/registrarte', upload.single("avatar"), validations,userController.store);
/* router.get('/users', userController.ingresa) */
router.get('/pruebas', userController.list)
router.get("/perfil",userController.userProfile);

module.exports = router;
 