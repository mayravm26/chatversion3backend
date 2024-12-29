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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsuarios = void 0;
const usuario_1 = require("../models/usuario");
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener la paginación desde la consulta
        const desde = Number(req.query.desde) || 0;
        // Excluir el usuario actual y ordenar por estado de conexión
        const usuarios = yield usuario_1.UsuarioModel.find({ _id: { $ne: req.uid } })
            .sort('-online')
            .skip(desde)
            .limit(20);
        // Respuesta JSON
        res.status(200).json({
            ok: true,
            usuarios,
        });
    }
    catch (error) {
        console.error('Error obteniendo usuarios:', error);
        // Enviar respuesta de error
        res.status(500).json({
            ok: false,
            msg: 'Error obteniendo usuarios. Por favor, inténtelo más tarde.',
        });
    }
});
exports.getUsuarios = getUsuarios;
