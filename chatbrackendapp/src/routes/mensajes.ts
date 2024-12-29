import { Router } from 'express';
import { validarJWT } from '../middlewares/validar-jwt';
import { getMensajes } from '../controllers/mensajes';

const router = Router();

router.get('/:de', validarJWT, getMensajes);

export default router;
