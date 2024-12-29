"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCampos = void 0;
const express_validator_1 = require("express-validator");
// Middleware para validar campos
const validarCampos = (req, res, next) => {
    const errores = (0, express_validator_1.validationResult)(req);
    if (!errores.isEmpty()) {
        res.status(400).json({
            ok: false,
            errors: errores.mapped(), // Mapea los errores a un objeto legible
        });
        return; // Importante: detiene la ejecución si hay errores
    }
    next(); // Continúa al siguiente middleware o controlador si no hay errores
};
exports.validarCampos = validarCampos;
