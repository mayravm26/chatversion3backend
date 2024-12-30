import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extender la interfaz Request para incluir `uid`
declare global {
    namespace Express {
        interface Request {
            uid?: string;
        }
    }
}

export const validarJWT = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('x-token');

    if (!token) {
        res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición',
        });
        return;
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY || 'tu_clave_secreta') as { uid: string };
        req.uid = uid; // Asignar el UID al objeto `req`
        next(); // Pasar al siguiente middleware
    } catch (error) {
        console.error('Error verificando el token:', error);
        res.status(401).json({
            ok: false,
            msg: 'Token no válido',
        });
    }
};
