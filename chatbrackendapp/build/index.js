"use strict";
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
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Conexión a la base de datos
(0, config_1.run)();
// Rutas de la API
app.use('/api/auth', auth_1.default);
app.use('/api/usuarios', usuarios_1.default);
app.use('/api/mensajes', mensajes_1.default);
// Inicializar los sockets
(0, socket_1.socketController)(exports.io);
// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
