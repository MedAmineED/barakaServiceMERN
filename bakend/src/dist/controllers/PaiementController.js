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
exports.deletePaiement = exports.updatePaiement = exports.getPaiementById = exports.getAllPaiements = exports.createPaiement = void 0;
const Paiement_1 = __importDefault(require("../models/Paiement"));
const DemandeService_1 = __importDefault(require("../models/DemandeService"));
// Create a Paiement
const createPaiement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paiement = yield Paiement_1.default.create(req.body);
        res.status(201).json(paiement);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create paiement' });
    }
});
exports.createPaiement = createPaiement;
// Get all Paiements
const getAllPaiements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paiements = yield Paiement_1.default.findAll({
            include: [DemandeService_1.default] // Include associated DemandeService if needed
        });
        res.status(200).json(paiements);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch paiements' });
    }
});
exports.getAllPaiements = getAllPaiements;
// Get a single Paiement by ID
const getPaiementById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paiement = yield Paiement_1.default.findByPk(req.params.id, {
            include: [DemandeService_1.default] // Include associated DemandeService if needed
        });
        if (paiement) {
            res.status(200).json(paiement);
        }
        else {
            res.status(404).json({ error: 'Paiement not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch paiement' });
    }
});
exports.getPaiementById = getPaiementById;
// Update a Paiement by ID
const updatePaiement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updated] = yield Paiement_1.default.update(req.body, {
            where: { id_p: req.params.id }
        });
        if (updated) {
            const updatedPaiement = yield Paiement_1.default.findByPk(req.params.id);
            res.status(200).json(updatedPaiement);
        }
        else {
            res.status(404).json({ error: 'Paiement not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update paiement' });
    }
});
exports.updatePaiement = updatePaiement;
// Delete a Paiement by ID
const deletePaiement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield Paiement_1.default.destroy({
            where: { id_p: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ error: 'Paiement not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete paiement' });
    }
});
exports.deletePaiement = deletePaiement;
