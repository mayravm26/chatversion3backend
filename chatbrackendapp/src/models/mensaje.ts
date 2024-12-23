import { Schema, model, Document } from 'mongoose';

// Interfaz para tipar el documento de Mensaje
export interface IMensaje extends Document {
    de: string;
    para: string;
    mensaje: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Esquema del modelo Mensaje
const MensajeSchema = new Schema<IMensaje>(
    {
        de: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true,
        },
        para: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true,
        },
        mensaje: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Agrega campos createdAt y updatedAt automáticamente
    }
);

// Método toJSON para personalizar la salida del objeto
MensajeSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id; // Renombrar _id a id
    return object;
});

// Exportar el modelo
export const Mensaje = model<IMensaje>('Mensaje', MensajeSchema);
