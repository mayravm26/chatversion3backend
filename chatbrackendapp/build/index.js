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
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./database/config");
const auth_1 = __importDefault(require("./routes/auth"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
const mensajes_1 = __importDefault(require("./routes/mensajes"));
const socket_1 = require("./sockets/socket");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: '*', // Permitir solicitudes de cualquier origen
        methods: ['GET', 'POST'],
        allowedHeaders: ['x-token'], // Permitir encabezado personalizado
    },
});
// Evento de conexión de WebSocket
exports.io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Cliente conectado: ${socket.id}`);
    try {
        yield (0, socket_1.socketController)(socket, exports.io); // Controlador de socket
    }
    catch (error) {
        console.error('Error al manejar la conexión del cliente:', error);
    }
    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });
}));
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Conexión a la base de datos
(0, config_1.run)();
// Rutas de la API
app.use('/api/auth', auth_1.default);
app.use('/api/usuarios', usuarios_1.default);
app.use('/api/mensajes', mensajes_1.default);
// Iniciar el servidor
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
