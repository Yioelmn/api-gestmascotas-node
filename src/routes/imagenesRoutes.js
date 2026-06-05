import {Router} from 'express';
import { imagenesController } from '../controllers/imagenesController.js';

const router = Router();

router.post('/imagenes', imagenesController.crear);
router.delete('/imagenes/:id', imagenesController.eliminar);

export default router;