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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDemandeService = exports.updateDemandeService = exports.getDemandeServiceById = exports.getAllDemandeServices = exports.createDemandeService = void 0;
const DemandeService_1 = __importDefault(require("../models/DemandeService"));
const Paiement_1 = __importDefault(require("../models/Paiement"));
const LigneDemande_1 = __importDefault(require("../models/LigneDemande"));
const ConnexionDB_1 = __importDefault(require("../DBconfig/ConnexionDB"));
// Create a DemandeService
const createDemandeService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield ConnexionDB_1.default.transaction();
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");
    console.log("req body : ", req.body);
    try {
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const dateTime = `${date}`;
        const _a = req.body, { lignedemande } = _a, demandeServiceData = __rest(_a, ["lignedemande"]);
        console.log("before check if lignes empty : ", lignedemande);
        // Check if lignedemande is not empty
        if (!lignedemande || lignedemande.length === 0) {
            console.log({ error: 'LigneDemande cannot be empty' });
            return res.status(400).json({ error: 'LigneDemande cannot be empty' });
        }
        // Create DemandeService without including Paiement initially
        const demandeService = yield DemandeService_1.default.create(Object.assign(Object.assign({}, demandeServiceData), { date_demande: dateTime }), { include: [LigneDemande_1.default], transaction });
        console.log("before adding lignes : ", lignedemande);
        // Add LigneDemandes
        for (const ligne of lignedemande) {
            console.log("ligne : ", ligne);
            ligne.demande_srv = demandeService.id_dem; // Set foreign key
            yield LigneDemande_1.default.create(ligne, { transaction });
        }
        yield transaction.commit();
        res.status(201).json(demandeService);
    }
    catch (error) {
        yield transaction.rollback();
        // Handle unknown error type
        if (error instanceof Error) {
            console.log({ error: 'Failed to create demandeService', details: error.message });
            res.status(500).json({ error: 'Failed to create demandeService', details: error.message });
        }
        else {
            console.log({ error: 'Failed to create demandeService' });
            res.status(500).json({ error: 'Failed to create demandeService' });
        }
    }
});
exports.createDemandeService = createDemandeService;
// Get all DemandeServices
const getAllDemandeServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const demandeServices = yield DemandeService_1.default.findAll({
            include: [Paiement_1.default, DemandeService_1.default] // Include associations if needed
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
            include: [Paiement_1.default, DemandeService_1.default] // Include associations if needed
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
