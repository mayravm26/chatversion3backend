import { Socket } from 'socket.io';
import { comprobarJWT } from '../helpers/jwts';
import { usuarioConectado, usuarioDesconectado, grabarMensaje } from '../controllers/socket';

interface Payload {
    de: string;
    para: string;
    mensaje: string;
}

export const socketController = (io: any) => {
    io.on('connection', async (client: Socket) => {
        console.log(`Cliente conectado: ${client.id}`);

        // Validar el token enviado por el cliente
        const token = client.handshake.headers['x-token'] as string | undefined;

        if (!token) {
            console.log('Token no enviado por el cliente');
            return client.disconnect(); // Desconectar si no hay token
        }

        const [valido, uid] = comprobarJWT(token);

        if (!valido || !uid) {
            console.log('Token inválido o UID no encontrado');
            return client.disconnect(); // Desconectar si el token es inválido
        }

        // Cliente autenticado
        await usuarioConectado(uid);
        client.join(uid); // Sala única para el cliente según su UID

        // Escuchar mensajes personales
        client.on('mensaje-personal', async (payload: Payload) => {
            console.log('Mensaje recibido:', payload);

            const mensajeGuardado = await grabarMensaje(payload);
            if (mensajeGuardado) {
                io.to(payload.para).emit('mensaje-personal', payload); // Enviar mensaje al destinatario
            }
        });

        // Cliente desconectado
        client.on('disconnect', async () => {
            console.log(`Cliente desconectado: ${client.id}`);
            await usuarioDesconectado(uid);
        });
    });
};
