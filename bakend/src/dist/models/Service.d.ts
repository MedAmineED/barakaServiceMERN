import { Model } from "sequelize-typescript";
import CategorieService from "./CategorieService";
declare class Service extends Model {
    id: number;
    categorieid: number;
    libelle: string;
    pu: number;
    remise: number;
    categorie: CategorieService;
}
export default Service;
//# sourceMappingURL=Service.d.ts.map