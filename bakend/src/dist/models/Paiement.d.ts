import { Model } from "sequelize-typescript";
import DemandeService from "./DemandeService";
declare class Paiement extends Model {
    id_p: number;
    demande_srv: number;
    date_payement: Date;
    numero_cheque?: string;
    date_cheque?: Date;
    banque?: string;
    payer: boolean;
    montant: number;
    demandeService: DemandeService;
}
export default Paiement;
//# sourceMappingURL=Paiement.d.ts.map