import { Request, Response } from 'express';
import { MensajeModel } from '../models/mensaje';

export const getMensajes = async (req: Request, res: Response): Promise<void> => {
    const miUid = req.uid; // `uid` definido en el middleware `validarJWT`
    const mensajesDe = req.params.de; // UID del otro usuario

    try {
        // Obtener los últimos 30 mensajes entre `miUid` y `mensajesDe`
        const ultimos30Mensajes = await MensajeModel.find({
            $or: [
                { de: miUid, para: mensajesDe },
                { de: mensajesDe, para: miUid },
            ],
        })
            .sort({ createdAt: 'desc' }) // Ordenar por fecha descendente
            .limit(30); // Limitar a 30 mensajes

        res.json({
            ok: true,
            mensajes: ultimos30Mensajes,
        });
    } catch (error) {
        console.error('Error obteniendo mensajes:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los mensajes',
        });
    }
};
