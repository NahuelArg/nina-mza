const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./Routes/indexRoutes");
const invalidRoute = require("./Middleware/invalidRoute");
const cloudinary = require('cloudinary').v2

const server = express();

server.name = "API";
server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());
server.use(
  cors({
    origin: [
      "https://ninamza.com.ar",
      "http://localhost:5173",
      "https://nina-mza.onrender.com"],
    credentials: true,
  })
);

// Middleware para registrar solicitudes entrantes con validación de Origin
server.use((req, res, next) => {
  const origin = req.headers.origin || "Origen no definido";
  console.log(`Solicitud entrante: ${req.method} ${req.url} desde ${origin}`);
  next();
});

// Ruta para manejar solicitudes a la raíz
server.get('/', (req, res) => {
  res.send('Bienvenido a la API de Nina Showroom');
});

// Rutas API y middleware
server.use("/api", router); // Montar el router

// Middleware para rutas no válidas de la API
server.use("/api/*", invalidRoute);
//Cloudinary Config


module.exports = server;
