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
const ArticleController_1 = require("../controllers/ArticleController");
const Article_1 = __importDefault(require("../models/Article"));
const articleRoutes = (0, express_1.Router)();
articleRoutes.post('/', ArticleController_1.createArticle);
articleRoutes.get('/', ArticleController_1.getAllArticles);
articleRoutes.get('/:id', ArticleController_1.getArticleById);
articleRoutes.put('/:id', ArticleController_1.updateArticle);
articleRoutes.delete('/:id', ArticleController_1.deleteArticle);
// Route pour ajouter plusieurs articles
//------just for testing
articleRoutes.post('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Supposons que req.body est un tableau d'articles
        const articles = req.body; // Il devrait être un tableau d'objets
        // Validez les données si nécessaire
        // Ajoutez tous les articles en une seule requête
        const newArticles = yield Article_1.default.bulkCreate(articles);
        res.status(201).json(newArticles);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the articles.' });
    }
}));
exports.default = articleRoutes;
