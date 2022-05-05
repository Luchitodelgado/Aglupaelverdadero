// Requerimos express y lo ejecutamos para tener disponibles todos los metodos que vamos a precisar
const express = require("express");
const app = express();

// Modulo nativo para manejar las rutas de los archivos
const path = require("path");

// Usando recursos estáticos.
app.use(express.static("public"));

// Ponemos a escuchar el servidor
app.listen(3030, () => {
    console.log("Servidor corriendo en http://localhost:4000")
});

// Definimos las rutas a los distintos pedidos que nuestro sitio sabe responder
app.get ("/", (req,res) => {
    let htmlPath = path.resolve(__dirname, "./views/home.html");
    res.sendFile(htmlPath)
});
app.get ("/shopMujer", (req,res) => {
    let htmlPath = path.resolve(__dirname, "./views/shopMujer.html");
    res.sendFile(htmlPath)
});
app.get ("/ingresa", (req,res) => {
    let htmlPath = path.resolve(__dirname, "./views/ingresa.html");
    res.sendFile(htmlPath)
});
app.get ("/registrarte", (req,res) => {
    let htmlPath = path.resolve(__dirname, "./views/registrarte.html");
    res.sendFile(htmlPath)
});