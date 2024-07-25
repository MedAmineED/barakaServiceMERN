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
exports.deleteCategorieService = exports.updateCategorieService = exports.getCategorieServiceById = exports.getAllCategorieServices = exports.createCategorieService = void 0;
const CategorieService_1 = __importDefault(require("../models/CategorieService"));
// Create a CategorieService
const createCategorieService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("add req : ", req.body);
    try {
        const categorieService = yield CategorieService_1.default.create(req.body);
        res.status(201).json(categorieService);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create categorieService' });
    }
});
exports.createCategorieService = createCategorieService;
// Get all CategorieServices
const getAllCategorieServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categorieServices = yield CategorieService_1.default.findAll();
        res.status(200).json(categorieServices);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch categorieServices' });
    }
});
exports.getAllCategorieServices = getAllCategorieServices;
// Get a single CategorieService by ID
const getCategorieServiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categorieService = yield CategorieService_1.default.findByPk(req.params.id);
        if (categorieService) {
            res.status(200).json(categorieService);
        }
        else {
            res.status(404).json({ error: 'CategorieService not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch categorieService' });
    }
});
exports.getCategorieServiceById = getCategorieServiceById;
// Update a CategorieService by ID
const updateCategorieService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updated] = yield CategorieService_1.default.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedCategorieService = yield CategorieService_1.default.findByPk(req.params.id);
            res.status(200).json(updatedCategorieService);
        }
        else {
            res.status(404).json({ error: 'CategorieService not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update categorieService' });
    }
});
exports.updateCategorieService = updateCategorieService;
// Delete a CategorieService by ID
const deleteCategorieService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield CategorieService_1.default.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ error: 'CategorieService not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete categorieService' });
    }
});
exports.deleteCategorieService = deleteCategorieService;
