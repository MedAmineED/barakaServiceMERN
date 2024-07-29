import { Request, Response } from 'express';
import DemandeService from '../models/DemandeService';
import Paiement from '../models/Paiement';
import LigneDemande from '../models/LigneDemande';
import sequelizeConnexion from '../DBconfig/ConnexionDB';
import { ExecException } from 'child_process';
 
// Create a DemandeService
export const createDemandeService = async (req: Request, res: Response) => {
    const transaction = await sequelizeConnexion.transaction();

    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa")
    console.log("req body : ",req.body)

    try {
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const dateTime = `${date}`;

        const { lignedemande, ...demandeServiceData } = req.body;

        console.log("before check if lignes empty : ", lignedemande);
        // Check if lignedemande is not empty
        if (!lignedemande || lignedemande.length === 0) {
            console.log({ error: 'LigneDemande cannot be empty' })
            return res.status(400).json({ error: 'LigneDemande cannot be empty' });
        }

        // Create DemandeService without including Paiement initially
        const demandeService = await DemandeService.create(
            { ...demandeServiceData, date_demande: dateTime },
            { include: [LigneDemande], transaction }
        );

        console.log("before adding lignes : ", lignedemande);
        // Add LigneDemandes
        for (const ligne of lignedemande) {
            console.log("ligne : ", ligne);
            ligne.demande_srv = demandeService.id_dem; // Set foreign key
            await LigneDemande.create(ligne, { transaction });
        }

        await transaction.commit();
        res.status(201).json(demandeService);
    } catch (error) {
        await transaction.rollback();
        // Handle unknown error type
        if (error instanceof Error) {
            console.log({ error: 'Failed to create demandeService', details: error.message })
            res.status(500).json({ error: 'Failed to create demandeService', details: error.message });
        } else {
            console.log({ error: 'Failed to create demandeService' })
            res.status(500).json({ error: 'Failed to create demandeService' });
        }
    }
};

// Get all DemandeServices
export const getAllDemandeServices = async (req: Request, res: Response) => {
    try {
        const demandeServices = await DemandeService.findAll({
            include: [Paiement, DemandeService] // Include associations if needed
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
            include: [Paiement, DemandeService] // Include associations if needed
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
