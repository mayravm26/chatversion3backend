"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioModel = void 0;
const mongoose_1 = require("mongoose");
// Esquema del Usuario
const UsuarioSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    online: { type: Boolean, default: false },
}, {
    timestamps: true, // Agregar campos `createdAt` y `updatedAt`
});
// Exportar el modelo
exports.UsuarioModel = (0, mongoose_1.model)('Usuario', UsuarioSchema);
