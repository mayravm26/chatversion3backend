import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { UsuarioModel } from '../models/usuario';
import { generarJWT } from '../helpers/jwts';

export const crearUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const existeEmail = await UsuarioModel.findOne({ email });
        if (existeEmail) {
            res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado',
            });
            return;
        }

        const usuario = new UsuarioModel(req.body);
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token,
        });
    } catch (error) {
        console.error('Error en crearUsuario:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor',
        });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const usuarioDB = await UsuarioModel.findOne({ email });
        if (!usuarioDB) {
            res.status(404).json({
                ok: false,
                msg: 'El correo no se ha encontrado',
            });
            return;
        }

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            res.status(400).json({
                ok: false,
                msg: 'La contraseña no es válida',
            });
            return;
        }

        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            usuario: usuarioDB,
            token,
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor',
        });
    }
};

export const renewToken = async (req: Request, res: Response): Promise<void> => {
    try {
        const uid = req.uid;

        if (!uid) {
            res.status(400).json({
                ok: false,
                msg: 'UID no encontrado en la solicitud',
            });
            return;
        }

        const token = await generarJWT(uid);
        const usuario = await UsuarioModel.findById(uid);

        res.json({
            ok: true,
            usuario,
            token,
        });
    } catch (error) {
        console.error('Error en renewToken:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor',
        });
    }
};
