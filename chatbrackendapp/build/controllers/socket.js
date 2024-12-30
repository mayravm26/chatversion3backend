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
exports.grabarMensaje = exports.usuarioDesconectado = exports.usuarioConectado = void 0;
const mensaje_1 = require("../models/mensaje");
const usuario_1 = require("../models/usuario");
// Función que se dispara cuando un usuario se conecta
const usuarioConectado = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield usuario_1.UsuarioModel.findById(uid);
        if (!usuario)
            return null;
        usuario.online = true;
        yield usuario.save();
        return usuario;
    }
    catch (error) {
        console.error('Error conectando usuario:', error);
        return null;
    }
});
exports.usuarioConectado = usuarioConectado;
// Función que se dispara cuando un usuario se desconecta
const usuarioDesconectado = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield usuario_1.UsuarioModel.findById(uid);
        if (!usuario)
            return null;
        usuario.online = false;
        yield usuario.save();
        return usuario;
    }
    catch (error) {
        console.error('Error desconectando usuario:', error);
        return null;
    }
});
exports.usuarioDesconectado = usuarioDesconectado;
// Función para grabar un mensaje
const grabarMensaje = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Guardando mensaje:', payload);
    try {
        const mensaje = new mensaje_1.MensajeModel(payload); // Crear mensaje
        yield mensaje.save(); // Guardar en base de datos
        console.log('Mensaje guardado en la base de datos:', mensaje);
        return true;
    }
    catch (error) {
        console.error('Error grabando mensaje:', error);
        return false;
    }
});
exports.grabarMensaje = grabarMensaje;
