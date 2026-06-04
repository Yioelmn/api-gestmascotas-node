import { Router} from 'express';
import { etiquetasController} from '../controllers/etiquetasController.js';

const router = Router();

// Aqui van tooooodas las rutas de etiquetas
router.get('/etiquetas', etiquetasController.obtenerTodas);
router.get('/etiquetas/:id', etiquetasController.obtenerPorId);
router.post('/etiquetas', etiquetasController.crear);
router.put('/etiquetas/:id', etiquetasController.actualizar);
router.delete('/etiquetas/:id', etiquetasController.eliminar);

export default router;