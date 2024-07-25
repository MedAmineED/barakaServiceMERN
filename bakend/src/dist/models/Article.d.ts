import { DoubleDataType } from "sequelize";
import { Model } from "sequelize-typescript";
import Famille from "./Famille";
declare class Article extends Model {
    id: number;
    identification: string;
    designation: string;
    qte: number;
    qte_min: number;
    qte_max: number;
    prix_achat: DoubleDataType;
    prix_vente: DoubleDataType;
    tva: DoubleDataType;
    etat: number;
    inventaire: number;
    annee: number;
    familleId: number;
    famille: Famille;
}
export default Article;
//# sourceMappingURL=Article.d.ts.map