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
const express_1 = __importDefault(require("express"));
const ConnexionDB_1 = require("./DBconfig/ConnexionDB");
const categorieServiceRoutes_1 = __importDefault(require("./routes/categorieServiceRoutes"));
const serviceRoutes_1 = __importDefault(require("./routes/serviceRoutes"));
const demandeServiceRoutes_1 = __importDefault(require("./routes/demandeServiceRoutes"));
const LigneDemande_1 = __importDefault(require("./routes/LigneDemande"));
const paiementRoutes_1 = __importDefault(require("./routes/paiementRoutes"));
const articleRoutes_1 = __importDefault(require("./routes/articleRoutes"));
const familleRoutes_1 = __importDefault(require("./routes/familleRoutes"));
const cors_1 = __importDefault(require("cors"));
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
const app = (0, express_1.default)();
require('dotenv').config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Cors Policy
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
// Register routes
app.use('/api/categories', categorieServiceRoutes_1.default);
app.use('/api/services', serviceRoutes_1.default);
app.use('/api/demande-services', demandeServiceRoutes_1.default);
app.use('/api/ligne-services', LigneDemande_1.default);
app.use('/api/paiements', paiementRoutes_1.default);
app.use('/api/articles', articleRoutes_1.default);
app.use('/api/familles', familleRoutes_1.default);
app.use('/api/employees', employeeRoutes_1.default);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running on port ${PORT}`);
    yield (0, ConnexionDB_1.Connection)();
}));
