// pool es para mantener conexiones a base de datos activa y es reutilizable
import pg from 'pg';
const { Pool } = pg;

// se agrega export para que index lo lea ahora si
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,  // aqui decimos donde esta el string de conexión
    ssl: { rejectUnauthorized: false} // para que node y neon se comuniquen de forma segura
});

const initDB = async () => {
    try {
        // esto equivale al modelo de mascotas(?)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS mascota (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(15) NOT NULL,
            especie VARCHAR(15) NOT NULL,
            raza VARCHAR(15) NOT NULL,
            sexo VARCHAR(15) NOT NULL,
            edad INTEGER NOT NULL,
            latitud DOUBLE PRECISION,
            longitud DOUBLE PRECISION,
            comuna VARCHAR(30)
            );
        `);

        // esta equivale al model de etiquetas
        await pool.query(`
            CREATE TABLE IF NOT EXISTS etiquetas (
            id SERIAL PRIMARY KEY,
            nombre_etiqueta VARCHAR(20) NOT NULL
            );
        `);

        // LA INTERMEDIARIA entre mascota y etiqueta
        await pool.query(`
            CREATE TABLE IF NOT EXISTS mascota_etiqueta (
            mascota_id INTEGER REFERENCES mascota(id) ON DELETE CASCADE,
            etiqueta_id INTEGER REFERENCES etiquetas(id) ON DELETE CASCADE,
            PRIMARY KEY (mascota_id, etiqueta_id)
            );
        `);

        // esta es como el modelo de imagenes 
        await pool.query(`
            CREATE TABLE IF NOT EXISTS imagen_mascota(
            id SERIAL PRIMARY KEY,
            url_imagen TEXT NOT NULL,
            mascota_id INTEGER REFERENCES mascota(id) ON DELETE CASCADE
            );
        `);

        console.log('Tablas creadas o ya existen');
    } catch (e) {
        console.error('Error al inicializar la base de datos', e);
    }
};

initDB();