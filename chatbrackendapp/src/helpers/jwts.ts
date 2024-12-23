import jwt from 'jsonwebtoken';

export const generarJWT = (uid: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { uid },
            process.env.JWT_KEY || '',
            { expiresIn: '24h' },
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
    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY || '') as { uid: string };
        return [true, uid];
    } catch (error) {
        console.error('Error comprobando JWT:', error);
        return [false, null];
    }
};
