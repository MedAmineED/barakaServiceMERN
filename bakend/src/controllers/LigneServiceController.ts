import { Request, Response } from 'express';
import LigneServices from '../models/LigneService';
import DemandeService from '../models/DemandeService';

// Create a LigneServices
export const createLigneServices = async (req: Request, res: Response) => {
    try {
        const ligneServices = await LigneServices.create(req.body);
        res.status(201).json(ligneServices);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create ligneServices' });
    }
};

// Get all LigneServices
export const getAllLigneServices = async (req: Request, res: Response) => {
    try {
        const ligneServices = await LigneServices.findAll({
            include: [DemandeService] // Include associated DemandeService if needed
        });
        res.status(200).json(ligneServices);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ligneServices' });
    }
};

// Get a single LigneServices by ID
export const getLigneServicesById = async (req: Request, res: Response) => {
    try {
        const ligneServices = await LigneServices.findByPk(req.params.id, {
            include: [DemandeService] // Include associated DemandeService if needed
        });
        if (ligneServices) {
            res.status(200).json(ligneServices);
        } else {
            res.status(404).json({ error: 'LigneServices not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ligneServices' });
    }
};

// Update a LigneServices by ID
export const updateLigneServices = async (req: Request, res: Response) => {
    try {
        const [updated] = await LigneServices.update(req.body, {
            where: { id_ligne: req.params.id }
        });
        if (updated) {
            const updatedLigneServices = await LigneServices.findByPk(req.params.id);
            res.status(200).json(updatedLigneServices);
        } else {
            res.status(404).json({ error: 'LigneServices not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update ligneServices' });
    }
};

// Delete a LigneServices by ID
export const deleteLigneServices = async (req: Request, res: Response) => {
    try {
        const deleted = await LigneServices.destroy({
            where: { id_ligne: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'LigneServices not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete ligneServices' });
    }
};
