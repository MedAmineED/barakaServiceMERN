import { Router } from 'express';
import {
    createLigneServices,
    getAllLigneServices,
    getLigneServicesById,
    updateLigneServices,
    deleteLigneServices
} from '../controllers/LigneServiceController';

const ligneServicesRoutes = Router();

ligneServicesRoutes.post('/ligne-services', createLigneServices);
ligneServicesRoutes.get('/ligne-services', getAllLigneServices);
ligneServicesRoutes.get('/ligne-services/:id', getLigneServicesById);
ligneServicesRoutes.put('/ligne-services/:id', updateLigneServices);
ligneServicesRoutes.delete('/ligne-services/:id', deleteLigneServices);

export default ligneServicesRoutes;
