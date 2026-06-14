import {Router} from 'express';
import { mascotasController } from '../controllers/mascotasController.js';
// import { verificarToken } from '../middleware/authMiddleware.js' <- despues lo usamos

const router = Router();

router.get('/mascotas', mascotasController.obtenerTodas);
router.get('/mascotas/buscar', mascotasController.obtenerPorNombre);
router.get('/mascotas/:id', mascotasController.obtenerPorId);
router.post('/mascotas', mascotasController.crear);
router.put('/mascotas/:id', mascotasController.actualizar);
router.delete('/mascotas/:id', mascotasController.eliminar);
router.post('/mascotas/:id/etiquetas', mascotasController.vincularEtiqueta)

export default router;