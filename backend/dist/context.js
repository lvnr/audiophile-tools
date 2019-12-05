"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const photon_1 = require("@prisma/photon");
const photon = new photon_1.Photon();
exports.createContext = () => ({
    photon,
});
