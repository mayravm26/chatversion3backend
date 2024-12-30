/*import { Socket } from 'socket.io';
import { comprobarJWT } from '../helpers/jwts';
import { usuarioConectado, usuarioDesconectado, grabarMensaje } from '../controllers/socket';

interface Payload {
    de: string;
    para: string;
    mensaje: string;
}

export const socketController = (io: any) => {
    io.on('connection', async (client: Socket) => {
        console.time(`Conexión cliente ${client.id}`);
        console.log(`Cliente conectado: ${client.id}`);

        try {
            // Validar el token enviado como parámetro en la URL
            const token = client.handshake.query.token as string | undefined;
            console.log('Token recibido:', token);
            

            if (!token) {
                console.log('Token no enviado por el cliente');
                return client.disconnect(); // Desconectar si no hay token
            }

            const [valido, uid] = comprobarJWT(token);

            if (!valido || !uid) {
                console.log('Token inválido o UID no encontrado');
                return client.disconnect(); // Desconectar si el token es inválido
            }

            console.log(`Token válido. UID: ${uid}`);

            // Cliente autenticado
            await usuarioConectado(uid);
            client.join(uid); // Sala única para el cliente según su UID
            console.log(`Usuario autenticado: ${uid}`);

            // Escuchar mensajes personales
            client.on('mensaje-personal', async (payload: Payload) => {
                try {
                    console.log('Mensaje recibido:', payload);

                    const mensajeGuardado = await grabarMensaje(payload);
                    if (mensajeGuardado) {
                        io.to(payload.para).emit('mensaje-personal', payload); // Enviar mensaje al destinatario
                        console.log(`Mensaje enviado a ${payload.para}`);
                    } else {
                        console.log('Error al guardar el mensaje en la base de datos');
                    }
                } catch (error) {
                    console.error('Error procesando el mensaje personal:', error);
                }
            });

            // Cliente desconectado
            client.on('disconnect', async () => {
                try {
                    console.log(`Cliente desconectado: ${client.id}`);
                    await usuarioDesconectado(uid);
                    console.log(`Usuario desconectado: ${uid}`);
                } catch (error) {
                    console.error('Error procesando la desconexión del cliente:', error);
                }
            });
        } catch (error) {
            console.error('Error en el controlador de sockets:', error);
            client.disconnect(); // Desconectar el cliente si ocurre un error inesperado
        }
    });
};
*/
import { Socket } from 'socket.io';
import { comprobarJWT } from '../helpers/jwts';
import { usuarioConectado, usuarioDesconectado, grabarMensaje } from '../controllers/socket';

interface Payload {
    de: string;
    para: string;
    mensaje: string;
}

export const socketController = async (client: Socket, io: any) => {
    console.time(`Conexión cliente ${client.id}`);
    console.log(`Cliente conectado: ${client.id}`);

    try {
        // Validar el token enviado como parámetro en la URL
        const token = client.handshake.query.token as string | undefined;
        console.log('Token recibido:', token);

        if (!token) {
            console.error('Error: Token no enviado por el cliente');
            client.disconnect(); // Desconectar si no hay token
            return;
        }

        const [valido, uid] = comprobarJWT(token);

        if (!valido || !uid) {
            console.error('Error: Token inválido o UID no encontrado');
            client.disconnect(); // Desconectar si el token es inválido
            return;
        }

        console.log(`Token válido. UID: ${uid}`);

        // Cliente autenticado
        await usuarioConectado(uid);
        client.join(uid); // Sala única para el cliente según su UID
        console.log(`Usuario autenticado: ${uid}`);

        // Escuchar mensajes personales
        client.on('mensaje-personal', async (payload: Payload) => {
            try {
                console.log('Mensaje recibido:', payload);

                const mensajeGuardado = await grabarMensaje(payload);
                if (mensajeGuardado) {
                    client.to(payload.para).emit('mensaje-personal', payload);
                    console.log(`Mensaje enviado a ${payload.para}`);
                } else {
                    console.error('Error: No se pudo guardar el mensaje en la base de datos');
                }
            } catch (error) {
                console.error('Error procesando el mensaje personal:', error);
            }
        });

        // Cliente desconectado
        client.on('disconnect', async () => {
            try {
                console.log(`Cliente desconectado: ${client.id}`);
                await usuarioDesconectado(uid);
                console.log(`Usuario desconectado: ${uid}`);
            } catch (error) {
                console.error('Error procesando la desconexión del cliente:', error);
            }
        });
    } catch (error) {
        console.error('Error en el controlador de sockets:', error);
        client.disconnect(true); // Desconectar el cliente si ocurre un error inesperado
    } finally {
        console.timeEnd(`Conexión cliente ${client.id}`);
    }
};
