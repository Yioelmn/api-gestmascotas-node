import { imagenesService } from "../services/ImagenesService";

export const imagenesController = {
    async crear(req, res){
        try{
            const {url_imagen, mascota_id} = req.body;

            if(!url_imagen || !mascota_id){
                return res.status(400).json({ error: 'Fataln campos obligatorios (url_imagen, mascota_id)' });
            }

            const nuevaImagen = await imagenesService.crear(url_imagen, mascota_id);

            if(!nuevaimagen){
                return res.status(404)-json({error: 'No existe mascota a la que agregarle imagen'});
            }

            res.status(201).json(nuevaImagen);
        }catch(e){
            res.status(500).json({error: 'Error al registrar la imagen de la mascota'});
        }
    },

    async eliminar (req, res){
        try{
            const { id } = req.params;
            const eliminado = await imagenesService.eliminar(id);

            if(!eliminado){
                return res.status(404).json({error: 'Imagen no encontrada'});
            }

            res.json({message: 'Imagen eliminada con exito'});
        }catch (e){
            res.status(500).json({error: 'Error al eliminar la imagen'});
        }
    }
};