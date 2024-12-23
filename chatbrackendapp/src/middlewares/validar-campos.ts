import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

// Middleware para validar campos
export const validarCampos = (req: Request, res: Response, next: NextFunction): void => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        res.status(400).json({
            ok: false,
            errors: errores.mapped(), // Mapea los errores a un objeto legible
        });
        return; // Importante: detiene la ejecución si hay errores
    }

    next(); // Continúa al siguiente middleware o controlador si no hay errores
};
