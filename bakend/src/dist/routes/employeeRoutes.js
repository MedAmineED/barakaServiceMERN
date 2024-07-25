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
const EmployeeController_1 = require("../controllers/EmployeeController");
const Employee_1 = __importDefault(require("../models/Employee"));
const employeeRoutes = (0, express_1.Router)();
employeeRoutes.post('/', EmployeeController_1.createEmployee);
employeeRoutes.get('/', EmployeeController_1.getAllEmployees);
employeeRoutes.get('/:id', EmployeeController_1.getEmployeeById);
employeeRoutes.put('/:id', EmployeeController_1.updateEmployee);
employeeRoutes.delete('/:id', EmployeeController_1.deleteEmployee);
//---jsut for testing
employeeRoutes.post('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Supposons que req.body est un tableau d'employe
        const employe = req.body; // Il devrait être un tableau d'objets
        // Validez les données si nécessaire
        // Ajoutez tous les employe en une seule requête
        const newEmploye = yield Employee_1.default.bulkCreate(employe);
        res.status(201).json(newEmploye);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the employe.' });
    }
}));
exports.default = employeeRoutes;
