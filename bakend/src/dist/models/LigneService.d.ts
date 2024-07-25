import { Model } from "sequelize-typescript";
import DemandeService from "./DemandeService";
declare class LigneServices extends Model {
    id_ligne: number;
    demande_srv: number;
    type: string;
    categorie: string;
    element?: number;
    reference: string;
    designation: string;
    prix: number;
    tva: number;
    remise: number;
    quantite: number;
    demandeService: DemandeService;
}
export default LigneServices;
//# sourceMappingURL=LigneService.d.ts.map