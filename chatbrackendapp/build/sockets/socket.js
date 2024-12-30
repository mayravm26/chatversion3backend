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
exports.socketController = void 0;
const jwts_1 = require("../helpers/jwts");
const socket_1 = require("../controllers/socket");
const socketController = (io) => {
    io.on('connection', (client) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Cliente conectado: ${client.id}`);
        try {
            // Validar el token enviado por el cliente
            const token = client.handshake.headers['x-token'];
            if (!token) {
                console.log('Token no enviado por el cliente');
                return client.disconnect(); // Desconectar si no hay token
            }
            const [valido, uid] = (0, jwts_1.comprobarJWT)(token);
            if (!valido || !uid) {
                console.log('Token inválido o UID no encontrado');
                return client.disconnect(); // Desconectar si el token es inválido
            }
            // Cliente autenticado
            yield (0, socket_1.usuarioConectado)(uid);
            client.join(uid); // Sala única para el cliente según su UID
            console.log(`Usuario autenticado: ${uid}`);
            // Escuchar mensajes personales
            client.on('mensaje-personal', (payload) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    console.log('Mensaje recibido:', payload);
                    const mensajeGuardado = yield (0, socket_1.grabarMensaje)(payload);
                    if (mensajeGuardado) {
                        io.to(payload.para).emit('mensaje-personal', payload); // Enviar mensaje al destinatario
                        console.log(`Mensaje enviado a ${payload.para}`);
                    }
                    else {
                        console.log('Error al guardar el mensaje en la base de datos');
                    }
                }
                catch (error) {
                    console.error('Error procesando el mensaje personal:', error);
                }
            }));
            // Cliente desconectado
            client.on('disconnect', () => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    console.log(`Cliente desconectado: ${client.id}`);
                    yield (0, socket_1.usuarioDesconectado)(uid);
                    console.log(`Usuario desconectado: ${uid}`);
                }
                catch (error) {
                    console.error('Error procesando la desconexión del cliente:', error);
                }
            }));
        }
        catch (error) {
            console.error('Error en el controlador de sockets:', error);
            client.disconnect(); // Desconectar el cliente si ocurre un error inesperado
        }
    }));
};
exports.socketController = socketController;
