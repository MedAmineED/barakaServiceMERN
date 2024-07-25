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
exports.deleteDemandeService = exports.updateDemandeService = exports.getDemandeServiceById = exports.getAllDemandeServices = exports.createDemandeService = void 0;
const DemandeService_1 = __importDefault(require("../models/DemandeService"));
const Paiement_1 = __importDefault(require("../models/Paiement"));
const LigneService_1 = __importDefault(require("../models/LigneService"));
// Create a DemandeService
const createDemandeService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const demandeService = yield DemandeService_1.default.create(req.body, {
            include: [Paiement_1.default, LigneService_1.default] // Include associations if needed
        });
        res.status(201).json(demandeService);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create demandeService' });
    }
});
exports.createDemandeService = createDemandeService;
// Get all DemandeServices
const getAllDemandeServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const demandeServices = yield DemandeService_1.default.findAll({
            include: [Paiement_1.default, LigneService_1.default] // Include associations if needed
        });
        res.status(200).json(demandeServices);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch demandeServices' });
    }
});
exports.getAllDemandeServices = getAllDemandeServices;
// Get a single DemandeService by ID
const getDemandeServiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const demandeService = yield DemandeService_1.default.findByPk(req.params.id, {
            include: [Paiement_1.default, LigneService_1.default] // Include associations if needed
        });
        if (demandeService) {
            res.status(200).json(demandeService);
        }
        else {
            res.status(404).json({ error: 'DemandeService not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch demandeService' });
    }
});
exports.getDemandeServiceById = getDemandeServiceById;
// Update a DemandeService by ID
const updateDemandeService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updated] = yield DemandeService_1.default.update(req.body, {
            where: { id_dem: req.params.id }
        });
        if (updated) {
            const updatedDemandeService = yield DemandeService_1.default.findByPk(req.params.id);
            res.status(200).json(updatedDemandeService);
        }
        else {
            res.status(404).json({ error: 'DemandeService not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update demandeService' });
    }
});
exports.updateDemandeService = updateDemandeService;
// Delete a DemandeService by ID
const deleteDemandeService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield DemandeService_1.default.destroy({
            where: { id_dem: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ error: 'DemandeService not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete demandeService' });
    }
});
exports.deleteDemandeService = deleteDemandeService;
