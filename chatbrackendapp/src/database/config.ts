import mongoose from 'mongoose';

export const dbConnection = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.DB_CNN || '', {
            // Últimas versiones de Mongoose no requieren opciones adicionales.
        });
        console.log('Base de datos Online');
    } catch (error) {
        console.error(error);
        throw new Error('Error al inicializar la base de datos');
    }
};
