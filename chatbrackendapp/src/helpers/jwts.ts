import jwt from 'jsonwebtoken';

export const generarJWT = (uid: string): Promise<string> => {
    console.log('JWT_KEY usada para generar:', process.env.JWT_KEY); // Verificar que el JWT_KEY esté configurado

    return new Promise((resolve, reject) => {
        jwt.sign(
            { uid },
            process.env.JWT_KEY || 'tu_clave_secreta', // Usar la clave secreta
            { expiresIn: '24h' }, // Configuración del token
            (err, token) => {
                if (err) {
                    console.error('Error generando JWT:', err);
                    reject('No se pudo generar el JWT');
                }
                resolve(token || '');
            }
        );
    });
};

export const comprobarJWT = (token: string): [boolean, string | null] => {
    console.log('JWT_KEY al comprobar:', process.env.JWT_KEY); // Verificar que el JWT_KEY esté configurado

    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY || 'tu_clave_secreta') as { uid: string };
        return [true, uid];
    } catch (error) {
        console.error('Error comprobando JWT:', error);
        return [false, null];
    }
};
