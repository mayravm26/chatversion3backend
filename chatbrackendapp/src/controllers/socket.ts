import { MensajeModel , IMensaje } from '../models/mensaje';
import { UsuarioModel, IUsuario } from '../models/usuario';

// Interfaz para el payload del mensaje
interface MensajePayload {
    de: string;
    para: string;
    mensaje: string;
}

// Función que se dispara cuando un usuario se conecta
export const usuarioConectado = async (uid: string): Promise<IUsuario | null> => {
    try {
        const usuario = await UsuarioModel.findById(uid);
        if (!usuario) return null;

        usuario.online = true;
        await usuario.save();
        return usuario;
    } catch (error) {
        console.error('Error conectando usuario:', error);
        return null;
    }
};

// Función que se dispara cuando un usuario se desconecta
export const usuarioDesconectado = async (uid: string): Promise<IUsuario | null> => {
    try {
        const usuario = await UsuarioModel.findById(uid);
        if (!usuario) return null;

        usuario.online = false;
        await usuario.save();
        return usuario;
    } catch (error) {
        console.error('Error desconectando usuario:', error);
        return null;
    }
};

// Función para grabar un mensaje
export const grabarMensaje = async (payload: MensajePayload): Promise<boolean> => {
    console.log('Guardando mensaje:', payload);
    try {
        const mensaje = new MensajeModel (payload); // Crear mensaje
        await mensaje.save(); // Guardar en base de datos
        console.log('Mensaje guardado en la base de datos:', mensaje);
        return true;
    } catch (error) {
        console.error('Error grabando mensaje:', error);
        return false;
    }
};
