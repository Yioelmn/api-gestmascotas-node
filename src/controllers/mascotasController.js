import { mascotasService } from "../services/mascotasService.js";
import { imagenesService } from "../services/imagenesService.js";
import { enviarCorreo } from "../mailer/mailer.js";

export const mascotasController = {
    async obtenerTodas(req, res){
        try{
            const mascotas = await mascotasService.obtenerTodas();
            res.json(mascotas);
        }catch (e){
            res.status(500).json({ error: 'Error al obtener las mascotas' });
        }
    },

    async obtenerPorId(req, res){
        try{
            const { id } = req.params;
            const mascota = await mascotasService.obtenerPorId(id);
            if (!mascota){
                return res.status(404).json({ error: 'Mascota no encontrada' });
            }
            res.json(mascota);
        }catch (e){
            res.status(500).json({ error: 'Error al obtener la mascota'});
        }
    },

    async obtenerPorNombre(req, res){
        try{
            // Captura el nombre con query params
            const { nombre }= req.query;

            if(!nombre){
                return res.status(400).json({ error: 'Error, el parametro "nombre es requerido'});
            }

            const mascotas = await mascotasService.obtenerPorNombre(nombre);
            res.json(mascotas);

        }catch (e){
            res.status(500).json({ error: 'Error al encontrar la mascota'})
        }
    },

    async crear (req, res){
        try {
            const { nombre, especie, raza, sexo, edad, latitud, longitud, comuna, url_imagen, etiquetas, correoUsuario}=req.body;

            const usuario_id = req.usuario?.uid || req.headers['x-user-id'] || "USER_TEST_123"; // usuario de prueba

            //se fuerza conversion a entero
            const edadNumerica = parseInt(edad, 10);

            if(!nombre || !especie || !raza || !sexo || isNaN(edadNumerica) || !usuario_id){
                return res.status(400).json({ error: 'Porfavor llenar campos obligatorios'});
            }

            const nuevaMascota = await mascotasService.crear({
                nombre,
                especie,
                raza,
                sexo,
                edad: edadNumerica,
                latitud: latitud || -33.51,   
                longitud: longitud || -70.76, 
                comuna,
                usuario_id
            });

            // si mandan url desde front se guarda junto a la mascota
            if(url_imagen){
                await imagenesService.crear(url_imagen, nuevaMascota.id);
            }
            // si mandan array de id de etiquetas se vincula una por una
            if(etiquetas && etiquetas.length > 0){
                for(const etiquetaId of etiquetas){
                    await mascotasService.agregarEtiqueta(nuevaMascota.id, etiquetaId);
                }
            }

            // envio y creacion del correo
            if (correoUsuario) {
                const html = `
                    <h3>Hola, Tu reporte ha sido creado de forma exitosa.</h3>
                    <p>El reporte de tu mascota <b>${nombre}</b> ya está activo en nuestra aplicación.</p>
                    <p>Por favor, mantén la calma, estate atento a las novedades y recuerda que la comunidad te está ayudando.</p>
                    <br>
                    <p>Atentamente,<br><b>Equipo Sanos y Salvos</b></p>
                `;
                // sin await ppara evitar el tiempo de espera de envio del correo
                enviarCorreo(correoUsuario, "Reporte de mascota: ${nombre} registrado.", html);
            }
            return res.status(201).json(nuevaMascota);

        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Error al registrar mascota'});
            
        }
    },

    async actualizar(req, res){
        try{
            const {id} = req.params;
            const mascotaActualizada = await mascotasService.actualizar(id, req.body);
            if(!mascotaActualizada){
                return res.status(404).json({ error: 'Mascota no encontrada' });
            }
            res.json(mascotaActualizada);
        }catch(e){
            res.status(500).json({ error: 'Error al actualizar la mascota' });
        }
    },

    async eliminar(req, res){
        try{
            const {id} = req.params;
            const eliminado = await mascotasService.eliminar(id);
            if (!eliminado){
                return res.status(404).json({ error: 'Mascota no encontrada' });
            }
            res.json({ message: 'Mascota eliminada exitosamente' });
        }catch (e){
            res.status(500).json({ error: 'Error al eliminar la mascota' });
        }
    },

    // encpoint para vincular etiqueta a mascota
    async vincularEtiqueta(req, res){
        try{
            const {id} = req.params;
            const {etiqueta_id} = req.body;
            if(!etiqueta_id){
                return res.status(400).json({ error: 'etiqueta_id es requerido en el body' });
            }
            await mascotasService.agregarEtiqueta(id, etiqueta_id);
            res.json({ message: 'Etiqueta vinculada correctamente' });
        }catch (e){
            res.status(500).json({ error: 'Error al vincular etiqueta' });
        }
    }
};