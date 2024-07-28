import LigneDemande from "./LigneDemande";
import Paiement from "./Paiement";

interface DemandeService {
    id_dem: number;
    date_demande: Date;
    matricule: string;
    conducteur: string;
    employer: string;
    heure_deb: string;  // TIME type as string
    heure_fin: string;  // TIME type as string
    client: string;
    bon_commande: string;
    prixTTC: number;
    payer: number;
    marque: string;
    LigneDemande?: LigneDemande[];  // Array of LigneDemandes instances
    paiement?: Paiement[];  // Array of Paiement instances
}

export default DemandeService;
