import { Schema, model, Document } from 'mongoose';

// Interfaz para definir los campos del documento de usuario
export interface IUsuario extends Document {
    nombre: string;
    email: string;
    password: string;
    online: boolean;
    uid: string; // Se usará como alias de `_id`
}

// Esquema del modelo Usuario
const UsuarioSchema = new Schema<IUsuario>(
    {
        nombre: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        online: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // Agregar automáticamente createdAt y updatedAt
        toJSON: {
            virtuals: true, // Habilitar propiedades virtuales para JSON
            transform: (_, ret) => {
                // Transformar la salida JSON
                ret.uid = ret._id.toString(); // Mapear `_id` a `uid`
                delete ret._id; // Eliminar `_id` original
                delete ret.__v; // Eliminar `__v`
                delete ret.password; // No exponer la contraseña
                return ret;
            },
        },
    }
);

// Exportar el modelo
export const Usuario = model<IUsuario>('Usuario', UsuarioSchema);
