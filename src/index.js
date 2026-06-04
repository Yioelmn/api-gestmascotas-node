import 'dotenv/config'; // para cargar las variables de entorno desde el archivo .env
import express from 'express';
import cors from 'cors';
import { pool } from './config/db.js'; // para levantar conexion y crear tablas

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