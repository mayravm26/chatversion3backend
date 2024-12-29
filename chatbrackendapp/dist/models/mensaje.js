"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MensajeModel = void 0;
const mongoose_1 = require("mongoose");
const MensajeSchema = new mongoose_1.Schema({
    de: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    para: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    mensaje: { type: String, required: true },
}, {
    timestamps: true,
});
exports.MensajeModel = (0, mongoose_1.model)('Mensaje', MensajeSchema);
