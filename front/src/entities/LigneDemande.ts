import DemandeService from "./DemandeService";

interface LigneDemande {
    id_ligne?: number;
    demande_srv: number;
    type: string;
    categorie: string;
    element: number;
    reference: string;
    designation: string;
    prix: number;
    tva: number;
    remise: number;
    quantite: number;
    demandeService?: DemandeService;
}

export default LigneDemande;
