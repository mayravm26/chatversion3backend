import { Router } from 'express';
import { validarJWT } from '../middlewares/validar-jwt';
import { getUsuarios } from '../controllers/usuarios';

const router = Router();

router.get('/', validarJWT, getUsuarios);

export default router; // Exportar como default
