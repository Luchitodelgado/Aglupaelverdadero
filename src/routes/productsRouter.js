const express = require('express');
const router = express.Router();
const multer = require ('multer');
const path = require('path');

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
router.get('/productos', productosController.productos);
router.get("/productos/:id", productosController.productList)
router.get('/productos/detail/:id', productosController.detail);

// INTENTAR IMPLEMENTAR CARRITO
router.get('/productos/carrito', productosController.carrito);
router.post('/productos/carrito/:id', productosController.carrito);


// METODOS "ABM" (CREO QUE SERIA ESTO)
router.get('/create', productosController.createProductForm);
router.post('/newProduct', upload.single("fotoProducto"), productosController.create);
router.get('/productos/edit/:id', productosController.edit);
router.patch('/productos/edit/:id', upload.single("fotoProducto"), productosController.update);
router.delete('/productos/delete/:id', productosController.destroy);




module.exports = router;