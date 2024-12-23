import { Request, Response } from 'express';
import { Mensaje } from '../models/mensaje';

const getMensajes = async (req: Request, res: Response): Promise<Response> => {
    const miUid = req.uid; // Asegúrate de que `uid` esté definido en el middleware de autenticación
    const mensajesDe = req.params.de;

    try {
        // Cargar los últimos 30 mensajes 
        const ult30men = await Mensaje.find({
            // Recuperamos los mensajes que yo he enviado a un usuario 
            // y los que el usuario me ha enviado a mí de manera descendente
            $or: [
                { de: miUid, para: mensajesDe },
                { de: mensajesDe, para: miUid }
            ]
        }).sort({ createdAt: 'desc' }).limit(30);

        return res.json({
            ok: true,
            mensajes: ult30men
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

export {
    getMensajes
}