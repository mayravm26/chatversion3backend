"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const mensajes_1 = require("../controllers/mensajes");
const router = (0, express_1.Router)();
router.get('/:de', validar_jwt_1.validarJWT, mensajes_1.getMensajes);
exports.default = router;
