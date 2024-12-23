import { Request, Response } from 'express';
import { UsuarioModel } from '../models/usuario';

export const getUsuarios = async (req: Request, res: Response): Promise<void> => {
    try {
        // Obtener la paginación desde la consulta
        const desde: number = Number(req.query.desde) || 0;

        // Excluir el usuario actual y ordenar por estado de conexión
        const usuarios = await UsuarioModel.find({ _id: { $ne: req.uid } })
            .sort('-online')
            .skip(desde)
            .limit(20);

        // Respuesta JSON
        res.status(200).json({
            ok: true,
            usuarios,
        });
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);

        // Enviar respuesta de error
        res.status(500).json({
            ok: false,
            msg: 'Error obteniendo usuarios. Por favor, inténtelo más tarde.',
        });
    }
};
