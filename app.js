const express = require("express");
const app = express();

const path = require("path");

const mainRouter = require('./src/routes/mainRouter'); // Rutas main
const userRouter = require('./src/routes/userRouter'); // Rutas main
const productos = require ("./src/routes/productsRouter");
const borcegos = require ("./src/routes/borcegosRouter");

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, '/src/views'));

app.use(express.static("public"));

app.use('/', mainRouter);
app.use('/', userRouter);
app.use("/productos", productos);
app.use("/borcegos", borcegos);

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000")
});
