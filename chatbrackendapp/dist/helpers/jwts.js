"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comprobarJWT = exports.generarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign({ uid }, process.env.JWT_KEY || '', { expiresIn: '24h' }, (err, token) => {
            if (err) {
                console.error('Error generando JWT:', err);
                reject('No se pudo generar el JWT');
            }
            resolve(token || '');
        });
    });
};
exports.generarJWT = generarJWT;
const comprobarJWT = (token) => {
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY || '');
        return [true, uid];
    }
    catch (error) {
        console.error('Error comprobando JWT:', error);
        return [false, null];
    }
};
exports.comprobarJWT = comprobarJWT;
