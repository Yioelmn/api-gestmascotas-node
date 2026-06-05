import { pool } from '../config/db.js';

export const imagenesService = {

    async crear(url_imagen, mascota_id){
        // se verifica si la mascota existe
        const mascotaExiste = await pool.query('SELECT id FROM mascota WHERE id = $1;', [mascota_id]);
        if (mascotaExiste.rows.length === 0) return null;

        const resultado = await pool.query(`
            INSERT INTO imagen_mascota (url_imagen, mascota_id)
            VALUES ($1, $2)
            RETURNING *;
        `, [url_imagen, mascota_id]);

        return resultado.rows[0];

        return resultado.rows[0];
    },

    async eliminar(id){
        const resultado = await pool.query('DELETE FROM imagen_mascota WHERE id = $1;', [id]);
        return resultado.rowCount > 0;
    }
};