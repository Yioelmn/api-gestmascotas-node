// se importa pool
import { pool} from '../config/db.js';

// LOGICA DE NEGOCIO PARA ETIQUETAS (CRUD)
export const etiquetasService = {
    async obtenerTodas(){
        const resultado = await pool.query('SELECT * FROM etiquetas ORDER BY id ASC');
        return resultado.rows;
    },

    async obtenerPorId(id){
        const resultado = await pool.query('SELECT * FROM etiquetas WHERE id = $1;', [id]);
        return resultado.rows[0] || null;
    },

    async crear(nombre_etiqueta){
        const resultado = await pool.query(
            'INSERT INTO etiquetas (nombre_etiquetas) VALUES ($1) RETURNING *;',
            [nombre_etiqueta]
        );
        return resultado.rows[0];
    },

    async actualizar(id, nombre_etiqueta){
        const resultado = await pool.query(
            'UPDATE etiquetas SET nombre_etiquetas = $1 WHERE id = $2 RETURNING *;',
            [nombre_etiqueta, id]
        );
        return resultado.rows[0] || null;
    },

    async eliminar(id){
        const resultado = await pool.query('DELETE FROM etiquetas WHERE id = $1 RETURNING *;', [id]);
        return resultado.rowCount > 0; // true si se eliminó, false si no se encontró
    }
}