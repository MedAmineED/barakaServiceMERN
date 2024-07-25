"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ServiceController_1 = require("../controllers/ServiceController");
const Service_1 = __importDefault(require("../models/Service"));
const serviceRoutes = (0, express_1.Router)();
serviceRoutes.post('/', ServiceController_1.createService);
serviceRoutes.get('/', ServiceController_1.getAllServices);
serviceRoutes.get('/:id', ServiceController_1.getServiceById);
serviceRoutes.put('/:id', ServiceController_1.updateService);
serviceRoutes.delete('/:id', ServiceController_1.deleteService);
// Route pour ajouter plusieurs services
serviceRoutes.post('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Supposons que req.body est un tableau d'services
        const services = req.body; // Il devrait être un tableau d'objets
        // Validez les données si nécessaire
        // Ajoutez tous les services en une seule requête
        const newServices = yield Service_1.default.bulkCreate(services);
        res.status(201).json(newServices);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the services.' });
    }
}));
exports.default = serviceRoutes;
