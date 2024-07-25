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
exports.deleteService = exports.updateService = exports.getServiceById = exports.getAllServices = exports.createService = void 0;
const Service_1 = __importDefault(require("../models/Service"));
const CategorieService_1 = __importDefault(require("../models/CategorieService"));
const sequelize_1 = require("sequelize");
// Create a Service
const createService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("add req : ", req.body);
    try {
        const service = yield Service_1.default.create(req.body);
        res.status(201).json(service);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create service' });
    }
});
exports.createService = createService;
// Get all Services
const getAllServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchBy, searchValue, start, rowCpt } = req.query;
    const limit = parseInt(rowCpt) || null; // Default to null if not provided
    const offset = parseInt(start) || 0;
    try {
        let whereCondition = {}; // Start with an empty where condition
        if (searchBy && searchValue) {
            switch (searchBy) {
                case 'Libelle':
                    whereCondition.libelle = { [sequelize_1.Op.like]: `%${searchValue}%` };
                    break;
                case 'CategorieId':
                    whereCondition.categorieId = searchValue; // Assuming searchValue is the ID
                    break;
                case 'Prix_unitaire':
                    whereCondition.pu = searchValue;
                    break;
                case 'Remise':
                    whereCondition.remise = searchValue;
                    break;
                default:
                    break;
            }
        }
        // Fetch total count of services
        const totalCount = yield Service_1.default.count({
            where: Object.assign({}, whereCondition)
        });
        // Fetch services based on the constructed whereCondition
        const services = yield Service_1.default.findAll({
            where: whereCondition,
            limit: limit ? limit : totalCount,
            offset,
            include: [
                {
                    model: CategorieService_1.default,
                    attributes: ['libelle'] // Include the `libelle` name in the result
                }
            ]
        });
        const formattedServices = services.map(service => ({
            id: service.id,
            libelle: service.libelle,
            pu: service.pu,
            remise: service.remise,
            categorieId: service.categorieid,
            categorie: service.categorie ? service.categorie.libelle : null // Access the 'libelle' attribute from the included CategorieService
        }));
        res.json({ serviceList: formattedServices, totalCount });
    }
    catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ error: 'An error occurred while fetching services' });
    }
});
exports.getAllServices = getAllServices;
// Get a single Service by ID
const getServiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield Service_1.default.findByPk(req.params.id, {
            include: [CategorieService_1.default] // Include associated CategorieService if needed
        });
        if (service) {
            res.status(200).json(service);
        }
        else {
            res.status(404).json({ error: 'Service not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch service' });
    }
});
exports.getServiceById = getServiceById;
// Update a Service by ID
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updated] = yield Service_1.default.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedService = yield Service_1.default.findByPk(req.params.id);
            res.status(200).json(updatedService);
        }
        else {
            res.status(404).json({ error: 'Service not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update service' });
    }
});
exports.updateService = updateService;
// Delete a Service by ID
const deleteService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield Service_1.default.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ error: 'Service not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete service' });
    }
});
exports.deleteService = deleteService;
