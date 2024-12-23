import { Router } from 'express';
import { check } from 'express-validator';
import { crearUsuario, login, renewToken } from '../controllers/auth';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

// Crear instancia del router
const router = Router();

// Configuración de la ruta para crear un nuevo usuario
router.post(
    '/new',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos, // Middleware para validar campos
    ],
    crearUsuario
);

// Configuración de la ruta para login
router.post(
    '/',
    [
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos, // Middleware para validar campos
    ],
    login
);

// Configuración de la ruta para renovar el token
router.get('/renew', validarJWT, renewToken);

export default router;
