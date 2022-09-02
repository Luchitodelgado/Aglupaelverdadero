/* ------------------------------ EL ORDEN DE TODOS ESTOS BLOQUES ES IMPORTANTE------------------------------*/
/* ------------------------------ REQUERIMIENTOS ------------------------------*/
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');
const mainRouter = require('./src/routes/mainRouter');
const userRouter = require('./src/routes/userRouter');
const productos = require("./src/routes/productsRouter");
const apiRouter = require("./src/routes/api/usersApi");
const productsApi = require("./src/routes/api/productsApi");
const vistaCarrito = require("./src/routes/productsRouter");
const session = require('express-session');





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
app.use('/', apiRouter);
app.use('/', productsApi);
app.use('/',vistaCarrito);


app.use((req,res,next)=>{
    res.status(404).send('Pagina no encontrada')
})


/* ------------------------------ PONER EN MARCHA EL SV------------------------------*/
app.listen(3001, () => {
    console.log("Servidor corriendo en http://localhost:3001")
});
