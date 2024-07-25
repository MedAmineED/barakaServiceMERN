"use strict";
// import User from "./models/User";
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
exports.Connection = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Famille_1 = __importDefault(require("../models/Famille"));
const Article_1 = __importDefault(require("../models/Article"));
const Employee_1 = __importDefault(require("../models/Employee"));
const CategorieService_1 = __importDefault(require("../models/CategorieService"));
const Service_1 = __importDefault(require("../models/Service"));
const User_1 = __importDefault(require("../models/User"));
const DemandeService_1 = __importDefault(require("../models/DemandeService"));
const LigneService_1 = __importDefault(require("../models/LigneService"));
const Paiement_1 = __importDefault(require("../models/Paiement"));
// const { Seq } = require('sequelize');
// const User = require('../models/User');
// const userModel = require('../models/User');
require('dotenv').config();
const sequelizeConnexion = new sequelize_typescript_1.Sequelize({
    logging: false,
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    models: [Famille_1.default, Article_1.default, Employee_1.default, CategorieService_1.default, Service_1.default, User_1.default, DemandeService_1.default, LigneService_1.default, Paiement_1.default],
});
const Connection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelizeConnexion.authenticate();
        console.log('Connection has been established successfully.');
        yield sequelizeConnexion.sync({ alter: true }); // Sync models
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
exports.Connection = Connection;
exports.default = sequelizeConnexion;
