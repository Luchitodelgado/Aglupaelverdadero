const express = require('express');
const router = express.Router();
const multer = require ('multer');
const path = require('path');
const guestMiddleware= require('../middlewares/guestMiddleware')
const userMiddleware= require('../middlewares/userMiddleware')

const productosController = require('../controllers/productsController');

// MULTER PARA SUBIR ARCHIVOS Y PODER VALIDARLOS

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/img"));
    },
    filename: (req,file, cb) => {
        console.log(file);
        const newFilename = "fotoProducto" + Date.now() + path.extname(file.originalname);
        cb (null, newFilename);
        req.session.newFileName = newFilename
    }
});
const upload = multer ({storage})


// PROBANDO CRUD EN PRODUCTOS
router.get('/productos',userMiddleware, productosController.productos);
router.get("/productos/:id",userMiddleware,productosController.productList)
router.get('/productos/detail/:id',userMiddleware,productosController.detail);

// INTENTAR IMPLEMENTAR CARRITO
router.get('/vistaCarrito', productosController.vistaCarrito);


// METODOS "ABM" (CREO QUE SERIA ESTO)
router.get('/create',guestMiddleware,productosController.createProductForm);
router.post('/newProduct',guestMiddleware,upload.single("fotoProducto"), productosController.create);
router.get('/productos/edit/:id',guestMiddleware,productosController.edit);
router.patch('/productos/edit/:id',guestMiddleware,upload.single("fotoProducto"), productosController.update);
router.delete('/productos/delete/:id',guestMiddleware,productosController.destroy);




module.exports = router;