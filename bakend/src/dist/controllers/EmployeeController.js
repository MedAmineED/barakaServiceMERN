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
exports.deleteEmployee = exports.updateEmployee = exports.getEmployeeById = exports.getAllEmployees = exports.createEmployee = void 0;
const Employee_1 = __importDefault(require("../models/Employee"));
const sequelize_1 = require("sequelize");
// Create an Employee
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield Employee_1.default.create(req.body);
        res.status(201).json(employee);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create employee' });
    }
});
exports.createEmployee = createEmployee;
// Get all Employees
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchBy, searchValue, start, rowCpt } = req.query;
    const limit = parseInt(rowCpt) || 10; // Default to 10 if not provided
    const offset = parseInt(start) || 0;
    try {
        let whereCondition = { etat: 1 };
        if (searchBy && searchValue) {
            switch (searchBy) {
                case 'Nom':
                    whereCondition.nom = { [sequelize_1.Op.like]: `%${searchValue}%` };
                    break;
                case 'CIN':
                    whereCondition.cin = { [sequelize_1.Op.like]: `%${searchValue}%` };
                    break;
                case 'Mobile':
                    whereCondition.mobile = { [sequelize_1.Op.like]: `%${searchValue}%` };
                    break;
                case 'Salaire':
                    whereCondition.salaire = searchValue;
                    break;
            }
        }
        // Fetch total count of employees with etat: 1
        const totalCount = yield Employee_1.default.count({
            where: Object.assign({}, whereCondition)
        });
        // Fetch employees based on the constructed whereCondition
        const employees = yield Employee_1.default.findAll({
            where: whereCondition,
            limit,
            offset,
        });
        const formattedEmployees = employees.map(employee => ({
            id: employee.id,
            cin: employee.cin,
            nom: employee.nom,
            recrutement: employee.recrutement,
            mobile: employee.mobile,
            salaire: employee.salaire,
            specialite: employee.specialite,
            etat: employee.etat,
        }));
        res.json({ employeeList: formattedEmployees, totalCount });
    }
    catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'An error occurred while fetching employees' });
    }
});
exports.getAllEmployees = getAllEmployees;
// Get a single Employee by ID
const getEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield Employee_1.default.findByPk(req.params.id);
        if (employee) {
            res.status(200).json(employee);
        }
        else {
            res.status(404).json({ error: 'Employee not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch employee' });
    }
});
exports.getEmployeeById = getEmployeeById;
// Update an Employee by ID
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updated] = yield Employee_1.default.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedEmployee = yield Employee_1.default.findByPk(req.params.id);
            res.status(200).json(updatedEmployee);
        }
        else {
            res.status(404).json({ error: 'Employee not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update employee' });
    }
});
exports.updateEmployee = updateEmployee;
// Delete an Employee by ID
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield Employee_1.default.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ error: 'Employee not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete employee' });
    }
});
exports.deleteEmployee = deleteEmployee;
