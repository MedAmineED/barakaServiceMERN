import { Router } from 'express';
import {
    createLigneDemandes,
    getAllLigneDemandes,
    getLigneDemandesById,
    updateLigneDemandes,
    deleteLigneDemandes
} from '../controllers/LigneDemandeController';

const LigneDemandesRoutes = Router();

LigneDemandesRoutes.post('/ligne-services', createLigneDemandes);
LigneDemandesRoutes.get('/ligne-services', getAllLigneDemandes);
LigneDemandesRoutes.get('/ligne-services/:id', getLigneDemandesById);
LigneDemandesRoutes.put('/ligne-services/:id', updateLigneDemandes);
LigneDemandesRoutes.delete('/ligne-services/:id', deleteLigneDemandes);

export default LigneDemandesRoutes;
