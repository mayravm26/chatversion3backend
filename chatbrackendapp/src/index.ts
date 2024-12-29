import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import {run} from './database/config';
import authRoutes from './routes/auth';
import usuariosRoutes from './routes/usuarios';
import mensajesRoutes from './routes/mensajes';
const app = express();
const server = http.createServer(app);
export const io = new Server(server);
import './sockets/socket'; // Escuchar conexiones de sockets
import dotenv from 'dotenv';





// Conexión a la base de datos
run();
dotenv.config();

// Configuración de middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/mensajes', mensajesRoutes);


// Verificar que las variables de entorno se cargaron correctamente
console.log('JWT_KEY en index.ts:', process.env.JWT_KEY);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
