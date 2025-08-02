// controllers/agencyController.js

const { Agency } = require('../models');

// Créer une agence
exports.createAgency = async (req, res) => {
  try {
    const agency = await Agency.create(req.body);
    res.status(201).json(agency);
  } catch (error) {
    console.error('Erreur lors de la création de l\'agence :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création de l\'agence.' });
  }
};

// Obtenir toutes les agences
exports.getAllAgencies = async (req, res) => {
  try {
    const agencies = await Agency.findAll();
    res.status(200).json(agencies);
  } catch (error) {
    console.error('Erreur lors de la récupération des agences :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des agences.' });
  }
};

// Obtenir une agence par ID
exports.getAgencyById = async (req, res) => {
  try {
    const agency = await Agency.findByPk(req.params.id);
    if (!agency) {
      return res.status(404).json({ error: 'Agence non trouvée.' });
    }
    res.status(200).json(agency);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'agence :', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

// Mettre à jour une agence
exports.updateAgency = async (req, res) => {
  try {
    const agency = await Agency.findByPk(req.params.id);
    if (!agency) {
      return res.status(404).json({ error: 'Agence non trouvée.' });
    }
    await agency.update(req.body);
    res.status(200).json(agency);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'agence :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour.' });
  }
};

// Supprimer une agence
exports.deleteAgency = async (req, res) => {
  try {
    const agency = await Agency.findByPk(req.params.id);
    if (!agency) {
      return res.status(404).json({ error: 'Agence non trouvée.' });
    }
    await agency.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'agence :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression de l\'agence.' });
  }
};

