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
exports.deleteFamille = exports.updateFamille = exports.getFamilleById = exports.getAllFamilles = exports.createFamille = void 0;
const Famille_1 = __importDefault(require("../models/Famille"));
const Article_1 = __importDefault(require("../models/Article"));
// --------- ROUTE {/api/familles}
// Create a Famille
const createFamille = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const famille = yield Famille_1.default.create(req.body);
        res.status(201).json(famille);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create famille' });
    }
});
exports.createFamille = createFamille;
// Get all Familles
const getAllFamilles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const familles = yield Famille_1.default.findAll({
            include: [Article_1.default] // Include associated articles if needed
        });
        res.status(200).json(familles);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch familles' });
    }
});
exports.getAllFamilles = getAllFamilles;
// Get a single Famille by ID
const getFamilleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const famille = yield Famille_1.default.findByPk(req.params.id, {
            include: [Article_1.default] // Include associated articles if needed
        });
        if (famille) {
            res.status(200).json(famille);
        }
        else {
            res.status(404).json({ error: 'Famille not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch famille' });
    }
});
exports.getFamilleById = getFamilleById;
// Update a Famille by ID
const updateFamille = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updated] = yield Famille_1.default.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedFamille = yield Famille_1.default.findByPk(req.params.id);
            res.status(200).json(updatedFamille);
        }
        else {
            res.status(404).json({ error: 'Famille not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update famille' });
    }
});
exports.updateFamille = updateFamille;
// Delete an Famille by ID
const deleteFamille = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield Famille_1.default.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ error: 'Famille not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete Famille' });
    }
});
exports.deleteFamille = deleteFamille;
