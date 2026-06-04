import { etiquetasService } from '../services/etiquetasService.js';

export const etiquetasController = {
    async obtenerTodas(req, res) {
        try {
            const etiquetas = await etiquetasService.obtenerTodas();
            res.json(etiquetas);
        } catch (e) {
            res.status(500).json({ error: 'Error al obtener las etiquetas' });
        }
    },

    async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const etiqueta = await etiquetasService.obtenerPorId(id);
            if(!etiqueta){
                return res.status(404).json({ error: 'Etiqueta no encontrada' });
            }
            res.json(etiqueta);
        } catch(e){
            res.status(500).json({ error: 'Error al obtener la etiqueta' });
        }
    },

    async crear(req, res){
        try{
            const { nombre_etiqueta } = req.body;
            if(!nombre_etiqueta){
                return res.status(400).json({ error: 'El nombre de la etiqueta es requerido' });
            }
            const nuevaEtiqueta = await etiquetaService.crear(nombre_etiqueta);
            res.status(201).json(nuevaEtiqueta);
        }catch(e){
            res.status(500).json({ error: 'Error al crear la etiqueta' });
        }
    },

    async actualizar(req, res){
        try{
            const { id } = req.params;
            const { nombre_etiqueta } = req.body;
            if(!nombre_etiqueta){
                return res.status(400).json({ error: 'El nombre de la etiqueta es requerido'});
        }
        const etiquetaActualizada = await etiquetasService.actualizar(id, nombre_etiqueta);
        if(!etiquetaActualizada){
            return res.status(404).json({ error: 'Etiqueta no encontrada'});
        }
        res.json(etiquetaActualizada);
        }catch(e){
            res.status(500).json({ error: 'Error al actualizar la etiqueta'});
        }
    },

    async eliminar(req, res){
        try{
            const { id } = req.params;
            const etiquetaEliminada = await etiquetasService.eliminar(id);
            if(!etiquetaEliminada){
                return res.status(404).json({ error: 'Etiqueta no encontrada'});
            }
            res.json({ message: 'Etiqueta eliminada con exito'});
        }catch(e){
            res.status(500).json({ error: 'Error al eliminar la etiqueta'});
        }
    }
};