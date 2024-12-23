import { Router } from 'express';
import { validarJWT } from '../middlewares/validar-jwt';
import { getMensajes } from '../controllers/mensajes';

// Crear instancia del router
const router = Router();

// Ruta para obtener mensajes
router.get('/:de', validarJWT, getMensajes);

export default router;
