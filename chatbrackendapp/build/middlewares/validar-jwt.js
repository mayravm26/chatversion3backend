"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición',
        });
        return;
    }
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY || '');
        req.uid = uid; // Asignar el UID al objeto `req`
        next(); // Pasar al siguiente middleware
    }
    catch (error) {
        console.error('Error verificando el token:', error);
        res.status(401).json({
            ok: false,
            msg: 'Token no válido',
        });
    }
};
exports.validarJWT = validarJWT;
