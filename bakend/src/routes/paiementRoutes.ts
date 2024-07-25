import { Router } from 'express';
import {
    createPaiement,
    getAllPaiements,
    getPaiementById,
    updatePaiement,
    deletePaiement
} from '../controllers/PaiementController';

const paiementRoutes = Router();

paiementRoutes.post('/paiements', createPaiement);
paiementRoutes.get('/paiements', getAllPaiements);
paiementRoutes.get('/paiements/:id', getPaiementById);
paiementRoutes.put('/paiements/:id', updatePaiement);
paiementRoutes.delete('/paiements/:id', deletePaiement);

export default paiementRoutes;
