const express = require('express');
const router = express.Router();
const multer = require ('multer');
const path = require('path');

const productosController = require('../controllers/productsController');

/* Multer */

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/img"));
    },
    filename: (req,file, cb) => {
        console.log(file);
        const newFilename = "fotoProducto" + Date.now() + path.extname(file.originalname);
        cb (null, newFilename);
    }
});

const upload = multer ({storage})

router.get('/productos', productosController.productos);
router.get('/borcegos', productosController.borcegos);
router.get('/botas', productosController.botas);
router.get('/zapatillas', productosController.zapatillas);
router.get('/texanas', productosController.texanas);

router.get('/carrito', productosController.carrito);
router.post('/carrito/:id', productosController.carrito);
/*** GET ONE PRODUCT ***/
router.get('/productos/detail/:id', productosController.detail);

/**crear productos */
router.get('/productos/create', productosController.create);
router.post('/', upload.single("fotoProducto"), productosController.store);

/**Edicion productos*/
router.get('/productos/edit/:id', productosController.edit);
router.patch('/productos/edit/:id', upload.single("fotoProducto"), productosController.update);

/* borrar producto */
router.delete('/productos/delete/:id', productosController.destroy);




module.exports = router;