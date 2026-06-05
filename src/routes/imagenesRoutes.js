import {Router} from 'express';
<<<<<<< HEAD
import { imagenesController } from '..controllers/imagenesController.js';
=======
import { imagenesController } from '../controllers/imagenesController.js';
>>>>>>> feature/controller-y-service

const router = Router();

router.post('/imagenes', imagenesController.crear);
router.delete('/imagenes/:id', imagenesController.eliminar);

export default router;