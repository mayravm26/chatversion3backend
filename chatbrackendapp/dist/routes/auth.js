"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
// Crear instancia del router
const router = (0, express_1.Router)();
// Configuración de la ruta para crear un nuevo usuario
router.post('/new', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El correo es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').not().isEmpty(),
    validar_campos_1.validarCampos, // Middleware para validar campos
], auth_1.crearUsuario);
// Configuración de la ruta para login
router.post('/', [
    (0, express_validator_1.check)('email', 'El correo es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').not().isEmpty(),
    validar_campos_1.validarCampos, // Middleware para validar campos
], auth_1.login);
// Configuración de la ruta para renovar el token
router.get('/renew', validar_jwt_1.validarJWT, auth_1.renewToken);
exports.default = router;
