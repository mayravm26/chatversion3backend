import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import { run } from './database/config';
import authRoutes from './routes/auth';
import usuariosRoutes from './routes/usuarios';
import mensajesRoutes from './routes/mensajes';
import { socketController } from './sockets/socket';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: '*', // Permitir solicitudes de cualquier origen
        methods: ['GET', 'POST'],
        allowedHeaders: ['x-token'], // Permitir encabezado personalizado
    },
});

// Evento de conexión de WebSocket
io.on('connection', async (socket) => {

    console.log(`Cliente conectado: ${socket.id}`);
    try {
        await socketController(socket, io); // Controlador de socket
    } catch (error) {
        console.error('Error al manejar la conexión del cliente:', error);
    }

    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });
});

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
run();

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/mensajes', mensajesRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
