const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');


const mainRouter = require('./src/routes/mainRouter'); // Rutas main
const userRouter = require('./src/routes/userRouter'); // Rutas main
const productos = require ("./src/routes/productsRouter");
const session = require('express-session');
const { create } = require("domain");

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, '/src/views'));

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false })); // Para que se usa??
app.use(express.json()); // Para que se usa??
app.use(methodOverride('_method'));

app.use('/', mainRouter);
app.use('/', userRouter);
app.use('/', productos);
app.use(session({secret:"Mensaje secreto"}));

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000")});
