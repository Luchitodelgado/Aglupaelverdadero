/* ------------------------------ EL ORDEN DE TODOS ESTOS BLOQUES ES IMPORTANTE------------------------------*/
/* ------------------------------ REQUERIMIENTOS ------------------------------*/
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');
const mainRouter = require('./src/routes/mainRouter');
const userRouter = require('./src/routes/userRouter');
const productos = require("./src/routes/productsRouter");
const session = require('express-session');
const { create } = require("domain");
/* ------------------------------ MOTOR DE PLANTILLAS (TEMPLATE ENGINES) ------------------------------*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));
/* ------------------------------ MEDIOAMBIENTE DE LA APLICACION (MIDDLEWARES)------------------------------*/
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({ secret: "Mensaje secreto" }));
app.use('/', mainRouter);
app.use('/', userRouter);
app.use('/', productos);

/* ------------------------------ PONER EN MARCHA EL SV------------------------------*/
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000")
});
