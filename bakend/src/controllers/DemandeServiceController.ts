import { Request, Response } from 'express';
import DemandeService from '../models/DemandeService';
import Paiement from '../models/Paiement';
import LigneServices from '../models/LigneService';

// Create a DemandeService
export const createDemandeService = async (req: Request, res: Response) => {
    try {
        const demandeService = await DemandeService.create(req.body, {
            include: [Paiement, LigneServices] // Include associations if needed
        });
        res.status(201).json(demandeService);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create demandeService' });
    }
};

// Get all DemandeServices
export const getAllDemandeServices = async (req: Request, res: Response) => {
    try {
        const demandeServices = await DemandeService.findAll({
            include: [Paiement, LigneServices] // Include associations if needed
        });
        res.status(200).json(demandeServices);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch demandeServices' });
    }
};

// Get a single DemandeService by ID
export const getDemandeServiceById = async (req: Request, res: Response) => {
    try {
        const demandeService = await DemandeService.findByPk(req.params.id, {
            include: [Paiement, LigneServices] // Include associations if needed
        });
        if (demandeService) {
            res.status(200).json(demandeService);
        } else {
            res.status(404).json({ error: 'DemandeService not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch demandeService' });
    }
};

// Update a DemandeService by ID
export const updateDemandeService = async (req: Request, res: Response) => {
    try {
        const [updated] = await DemandeService.update(req.body, {
            where: { id_dem: req.params.id }
        });
        if (updated) {
            const updatedDemandeService = await DemandeService.findByPk(req.params.id);
            res.status(200).json(updatedDemandeService);
        } else {
            res.status(404).json({ error: 'DemandeService not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update demandeService' });
    }
};

// Delete a DemandeService by ID
export const deleteDemandeService = async (req: Request, res: Response) => {
    try {
        const deleted = await DemandeService.destroy({
            where: { id_dem: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'DemandeService not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete demandeService' });
    }
};
