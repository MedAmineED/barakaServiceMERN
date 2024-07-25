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
exports.deleteArticle = exports.updateArticle = exports.getArticleById = exports.getAllArticles = exports.createArticle = void 0;
const Article_1 = __importDefault(require("../models/Article"));
const Famille_1 = __importDefault(require("../models/Famille"));
const sequelize_1 = require("sequelize");
// Create an Article
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = yield Article_1.default.create(req.body);
        res.status(201).json(article);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create article' });
    }
});
exports.createArticle = createArticle;
const getAllArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchBy, searchValue, start, rowCpt } = req.query;
    const limit = parseInt(rowCpt) || null; // Default to 10 if not provided
    const offset = parseInt(start) || 0;
    try {
        let whereCondition = { etat: 1 };
        if (searchBy && searchValue) {
            switch (searchBy) {
                case 'Famille':
                    // Step 1: Find all Famille records with the search value
                    const familles = yield Famille_1.default.findAll({
                        where: { famille: { [sequelize_1.Op.like]: `%${searchValue}%` } }
                    });
                    if (familles.length === 0) {
                        return res.status(404).json({ message: 'No Famille records found' });
                    }
                    // Step 2: Collect all familleIds from the found Famille records
                    const familleIds = familles.map(famille => famille.id);
                    // Step 3: Retrieve all Article records associated with these familleIds
                    whereCondition.familleId = { [sequelize_1.Op.in]: familleIds };
                    break;
                case 'Identification':
                    whereCondition.identification = { [sequelize_1.Op.like]: `%${searchValue}%` };
                    break;
                case 'Designation':
                    whereCondition.designation = { [sequelize_1.Op.like]: `%${searchValue}%` };
                    break;
                case 'Prix_achat':
                    whereCondition.prix_achat = searchValue;
                    break;
                case 'Prix_vente':
                    whereCondition.prix_vente = searchValue;
                    break;
                default:
                    break;
            }
        }
        // Fetch total count of articles with etat: 1
        const totalCount = yield Article_1.default.count({
            where: Object.assign({}, whereCondition)
        });
        // Fetch articles based on the constructed whereCondition
        const articles = yield Article_1.default.findAll({
            where: whereCondition,
            limit: limit ? limit : totalCount,
            offset,
            include: [
                {
                    model: Famille_1.default,
                    attributes: ['famille'] // Include the `famille` name in the result
                }
            ]
        });
        const formattedArticles = articles.map(article => ({
            id: article.id,
            identification: article.identification,
            designation: article.designation,
            qte: article.qte,
            qte_min: article.qte_min,
            qte_max: article.qte_max,
            prix_achat: article.prix_achat,
            prix_vente: article.prix_vente,
            tva: article.tva,
            etat: article.etat,
            inventaire: article.inventaire,
            annee: article.annee,
            famille: article.famille ? article.famille.famille : null // Access the 'famille' attribute from the included Famille
        }));
        res.json({ articleList: formattedArticles, totalCount });
    }
    catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'An error occurred while fetching articles' });
    }
});
exports.getAllArticles = getAllArticles;
const getArticleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = yield Article_1.default.findByPk(req.params.id, {
            include: [{
                    model: Famille_1.default,
                    attributes: ['famille'] // Specify the attributes you want to include
                }]
        });
        if (article) {
            const formattedArticle = {
                id: article.id,
                identification: article.identification,
                designation: article.designation,
                qte: article.qte,
                qte_min: article.qte_min,
                qte_max: article.qte_max,
                prix_achat: article.prix_achat,
                prix_vente: article.prix_vente,
                tva: article.tva,
                etat: article.etat,
                inventaire: article.inventaire,
                annee: article.annee,
                famille: article.famille ? article.famille.famille : null // Include famille name if available
            };
            res.status(200).json(formattedArticle);
        }
        else {
            res.status(404).json({ error: 'Article not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch article' });
    }
});
exports.getArticleById = getArticleById;
const updateArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updated] = yield Article_1.default.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedArticle = yield Article_1.default.findByPk(req.params.id);
            res.status(200).json(updatedArticle);
        }
        else {
            res.status(404).json({ error: 'Article not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update article' });
    }
});
exports.updateArticle = updateArticle;
const deleteArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updated] = yield Article_1.default.update({ etat: 0 }, { where: { id: req.params.id } });
        if (updated) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ error: 'Article not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update article etat' });
    }
});
exports.deleteArticle = deleteArticle;
