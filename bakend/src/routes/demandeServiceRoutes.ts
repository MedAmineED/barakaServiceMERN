import { Router } from 'express';
import {
    createDemandeService,
    getAllDemandeServices,
    getDemandeServiceById,
    updateDemandeService,
    deleteDemandeService
} from '../controllers/DemandeServiceController';

const demandeServiceRoutes = Router();

demandeServiceRoutes.post('/demande-services', createDemandeService);
demandeServiceRoutes.get('/demande-services', getAllDemandeServices);
demandeServiceRoutes.get('/demande-services/:id', getDemandeServiceById);
demandeServiceRoutes.put('/demande-services/:id', updateDemandeService);
demandeServiceRoutes.delete('/demande-services/:id', deleteDemandeService);

export default demandeServiceRoutes;
