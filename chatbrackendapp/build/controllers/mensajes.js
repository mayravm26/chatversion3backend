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
exports.getMensajes = void 0;
const mensaje_1 = require("../models/mensaje");
const getMensajes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const miUid = req.uid; // `uid` definido en el middleware `validarJWT`
    const mensajesDe = req.params.de; // UID del otro usuario
    try {
        // Obtener los últimos 30 mensajes entre `miUid` y `mensajesDe`
        const ultimos30Mensajes = yield mensaje_1.MensajeModel.find({
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
    }
    catch (error) {
        console.error('Error obteniendo mensajes:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los mensajes',
        });
    }
});
exports.getMensajes = getMensajes;
