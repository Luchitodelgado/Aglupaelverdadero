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

router.get('/', productosController.productos);

/*** GET ONE PRODUCT ***/
router.get('/detail/:id', productosController.detail);

/**crear productos */
router.get('/create', productosController.create);
router.post('/', upload.single("fotoProducto"), productosController.store);

/**Edicion productos*/
router.get('/edit/:id', productosController.edit);
router.patch('/edit/:id', upload.single("fotoProducto"), productosController.update);

/* borrar producto */
router.delete('/delete/:id', productosController.destroy);



module.exports = router;