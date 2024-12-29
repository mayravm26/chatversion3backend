import { Schema, model, Document, Types } from 'mongoose';

export interface IMensaje extends Document {
    de: Types.ObjectId; // Usuario que envió el mensaje
    para: Types.ObjectId; // Usuario que recibe el mensaje
    mensaje: string; // Contenido del mensaje
}

const MensajeSchema = new Schema<IMensaje>(
    {
        de: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
        para: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
        mensaje: { type: String, required: true },
    },
    {
        timestamps: true, // Incluye `createdAt` y `updatedAt`
    }
);

export const MensajeModel = model<IMensaje>('Mensaje', MensajeSchema);
