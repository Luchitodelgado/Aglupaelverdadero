const express = require("express");
const app = express();
const path = require("path");
const productosRouter = require ("./src/routes/productosRouter")

app.use(express.static("public"));

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000")
});

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, '/src/views'));

const mainRouter = require('./src/routes/main'); // Rutas main
const userRouter = require('./src/routes/userRouter'); // Rutas main
const productos = require ("./src/routes/productosRouter");

app.use('/', mainRouter);

app.use('/', userRouter);

app.use("/productos", productosRouter);
