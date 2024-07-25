import { Model } from "sequelize-typescript";
import Paiement from "./Paiement";
import LigneServices from "./LigneService";
declare class DemandeService extends Model {
    id_dem: number;
    date_demande: Date;
    matricule: string;
    conducteur: string;
    employer: string;
    heure_deb: string;
    heure_fin: string;
    client: string;
    bon_commande: string;
    prixTTC: number;
    payer: number;
    marque: string;
    articles: LigneServices[];
    paiement: Paiement;
}
export default DemandeService;
//# sourceMappingURL=DemandeService.d.ts.map