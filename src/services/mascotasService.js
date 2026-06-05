import { pool } from '../config/db.js';

export const mascotasService = {

    async obtenerTodas(){
        const resultadoMascotas = await pool.query('SELECT * FROM mascota ORDER BY id DESC;');
        const mascotas = resultadoMascotas.rows;

        // aqui se inyecta una imagen y etiqueta en cada mascota
        for(let mascota of mascotas){
            const imgRes = await pool.query('SELECT id, url_imagen FROM imagen_mascota WHERE mascota_id = $1;', [mascota.id]);
            const etiqRes = await pool.query(`
                SELECT e.id, e.nombre_etiqueta
                FROM etiquetas e
                JOIN mascota_etiqueta me ON e.id = me.etiqueta_id
                WHERE me.mascota_id = $1
                `, [mascota.id]);

                mascota.imagenes = imgRes.rows;
                mascota.etiquetas = etiqRes.rows;
        }
        return mascotas;
    },

    // Get por id j
    async obtenerPorId(id){
        const resultadoMascota = await pool.query('SELECT * FROM mascota WHERE id = $1;', [id]);
        if (resultadoMascota.rows.length === 0) return null;

        const mascota = resultadoMascota.rows[0];

        const imgRes = await pool.query('SELECT id, url_imagen FROM imagen_mascota WHERE mascota_id = $1;', [id]);
        const etiqRes = await pool.query(`
            SELECT e.id, e.nombre_etiqueta 
            FROM etiquetas e
            JOIN mascota_etiqueta me ON e.id = me.etiqueta_id
            WHERE me.mascota_id = $1;
        `, [id]);

        mascota.imagenes = imgRes.rows;
        mascota.etiquetas = etiqRes.rows;

        return mascota;
    },

    // crear mascota
    async crear(datosMascota){
        const { nombre, especie, raza, sexo, edad, latitud, longitud, comuna } = datosMascota;
        const resultado = await pool.query(`
            INSERT INTO mascota (nombre, especie, raza, sexo, edad, latitud, longitud, comuna)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `, [nombre, especie, raza, sexo, edad, latitud, longitud, comuna]);

        return resultado.rows[0];
    },

    // actualizar mascota
    async actualizar(id, datosMascota){
        const {nombre, especie, raza, sexo, edad, latitud, longitud, comuna} = datosMascota;
        const resultado = await pool.query(`
            UPDATE mascota 
            SET nombre = $1, especie = $2, raza = $3, sexo = $4, edad = $5, latitud = $6, longitud = $7, comuna = $8
            WHERE id = $9
            RETURNING *;
        `, [nombre, especie, raza, sexo, edad, latitud, longitud, comuna, id]);

        return resultado.rows[0] || null;
    },

    // eliminar 
    async eliminar(id){
        const resultado = await pool.query('DELETE FROM mascota WHERE id = $1;', [id]);
        return resultado.rowCount > 0;
    },

    // Con esto se puede vincular una etiqueta existente a una mascota
    async agregarEtiqueta(mascotaId, etiquetaId){
        await pool.query(`
            INSERT INTO mascota_etiqueta (mascota_id, etiqueta_id)
            VALUES ($1, $2)
            ON CONFLICT DO NOTHING;
        `, [mascotaId, etiquetaId]);
    }
};