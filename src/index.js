import 'dotenv/config'; // para cargar las variables de entorno desde el archivo .env
import express from 'express';
import cors from 'cors';
import { pool } from './config/db.js'; // para levantar conexion y crear tablas
import etiquetasRoutes from './routes/etiquetasRoutes.js'; // importamos las rutas de etiquetas

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// se añade esto para conectar con las rutas
app.use('/api', etiquetasRoutes);

// ruta para probar si funciona jej
app.get('/', (req, res) => {
    res.json({ message: "Hola mundoooooo"});
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});