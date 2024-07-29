import { Model } from "sequelize-typescript";
import Paiement from "./Paiement";
import LigneDemande from "./LigneDemande";
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
    prix_ttc: number;
    payer: number;
    marque: string;
    lignedemande: LigneDemande[];
    paiement: Paiement;
}
export default DemandeService;
//# sourceMappingURL=DemandeService.d.ts.map