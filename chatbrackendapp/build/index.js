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
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server);
require("./sockets/socket"); // Escuchar conexiones de sockets
const dotenv_1 = __importDefault(require("dotenv"));
// Conexión a la base de datos
(0, config_1.run)();
dotenv_1.default.config();
// Configuración de middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rutas
app.use('/api/auth', auth_1.default);
app.use('/api/usuarios', usuarios_1.default);
app.use('/api/mensajes', mensajes_1.default);
// Verificar que las variables de entorno se cargaron correctamente
console.log('JWT_KEY en index.ts:', process.env.JWT_KEY);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
