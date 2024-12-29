"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewToken = exports.login = exports.crearUsuario = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwts_1 = require("../helpers/jwts");
const usuario_1 = require("../models/usuario");
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existeEmail = yield usuario_1.UsuarioModel.findOne({ email });
        if (existeEmail) {
            res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado',
            });
            return;
        }
        const usuario = new usuario_1.UsuarioModel(req.body);
        const salt = bcryptjs_1.default.genSaltSync();
        usuario.password = bcryptjs_1.default.hashSync(password, salt);
        yield usuario.save();
        const token = yield (0, jwts_1.generarJWT)(usuario.id);
        res.json({
            ok: true,
            usuario,
            token,
        });
    }
    catch (error) {
        console.error('Error en crearUsuario:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor',
        });
    }
});
exports.crearUsuario = crearUsuario;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const usuarioDB = yield usuario_1.UsuarioModel.findOne({ email });
        if (!usuarioDB) {
            res.status(404).json({
                ok: false,
                msg: 'El correo no se ha encontrado',
            });
            return;
        }
        const validPassword = bcryptjs_1.default.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            res.status(400).json({
                ok: false,
                msg: 'La contraseña no es válida',
            });
            return;
        }
        const token = yield (0, jwts_1.generarJWT)(usuarioDB.id);
        res.json({
            ok: true,
            usuario: usuarioDB,
            token,
        });
    }
    catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor',
        });
    }
});
exports.login = login;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.uid;
        if (!uid) {
            res.status(400).json({
                ok: false,
                msg: 'UID no encontrado en la solicitud',
            });
            return;
        }
        const token = yield (0, jwts_1.generarJWT)(uid);
        const usuario = yield usuario_1.UsuarioModel.findById(uid);
        res.json({
            ok: true,
            usuario,
            token,
        });
    }
    catch (error) {
        console.error('Error en renewToken:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor',
        });
    }
});
exports.renewToken = renewToken;
