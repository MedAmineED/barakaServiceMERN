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
exports.deleteLigneServices = exports.updateLigneServices = exports.getLigneServicesById = exports.getAllLigneServices = exports.createLigneServices = void 0;
const LigneService_1 = __importDefault(require("../models/LigneService"));
const DemandeService_1 = __importDefault(require("../models/DemandeService"));
// Create a LigneServices
const createLigneServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ligneServices = yield LigneService_1.default.create(req.body);
        res.status(201).json(ligneServices);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create ligneServices' });
    }
});
exports.createLigneServices = createLigneServices;
// Get all LigneServices
const getAllLigneServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ligneServices = yield LigneService_1.default.findAll({
            include: [DemandeService_1.default] // Include associated DemandeService if needed
        });
        res.status(200).json(ligneServices);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch ligneServices' });
    }
});
exports.getAllLigneServices = getAllLigneServices;
// Get a single LigneServices by ID
const getLigneServicesById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ligneServices = yield LigneService_1.default.findByPk(req.params.id, {
            include: [DemandeService_1.default] // Include associated DemandeService if needed
        });
        if (ligneServices) {
            res.status(200).json(ligneServices);
        }
        else {
            res.status(404).json({ error: 'LigneServices not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch ligneServices' });
    }
});
exports.getLigneServicesById = getLigneServicesById;
// Update a LigneServices by ID
const updateLigneServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updated] = yield LigneService_1.default.update(req.body, {
            where: { id_ligne: req.params.id }
        });
        if (updated) {
            const updatedLigneServices = yield LigneService_1.default.findByPk(req.params.id);
            res.status(200).json(updatedLigneServices);
        }
        else {
            res.status(404).json({ error: 'LigneServices not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update ligneServices' });
    }
});
exports.updateLigneServices = updateLigneServices;
// Delete a LigneServices by ID
const deleteLigneServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield LigneService_1.default.destroy({
            where: { id_ligne: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ error: 'LigneServices not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete ligneServices' });
    }
});
exports.deleteLigneServices = deleteLigneServices;
