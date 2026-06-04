require('dotenv').config(); // para cargar las variables de entorno desde el archivo .env
const express = require('express');
const cors = require('cors');
const pool = require('./config/db'); // para levantar conexion y crear tablas

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ruta para probar si funciona jej
app.get('/', (req, res) => {
    res.json({ message: "Hola mundoooooo"});
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});