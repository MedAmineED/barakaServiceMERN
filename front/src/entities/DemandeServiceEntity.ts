import LigneDemande from "./LigneDemande";
import Paiement from "./Paiement";

interface DemandeServiceEntity {
    id_dem?: number;
    date_demande?: Date;
    matricule: string;
    conducteur: string;
    employer: string;
    heure_deb: string;  // TIME type as string
    heure_fin: string;  // TIME type as string
    client: string;
    bon_commande: string;
    prix_ttc: number;
    payer: number;
    marque: string;
    lignedemande?: LigneDemande[] | [];  // Array of LigneDemandes instances
    paiement?: Paiement[];  // Array of Paiement instances
}

export default DemandeServiceEntity;
