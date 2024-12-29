import { Schema, model, Document } from 'mongoose';

// Interfaz para tipar el Usuario
export interface IUsuario extends Document {
    nombre: string;
    email: string;
    password: string;
    online: boolean;
}

// Esquema del Usuario
const UsuarioSchema = new Schema<IUsuario>(
    {
        nombre: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        online: { type: Boolean, default: false },
    },
    {
        timestamps: true, // Agregar campos `createdAt` y `updatedAt`
    }
);

// Exportar el modelo
export const UsuarioModel = model<IUsuario>('Usuario', UsuarioSchema);
