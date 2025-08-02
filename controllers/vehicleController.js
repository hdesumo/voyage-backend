// controllers/vehicleController.js

const { Vehicle } = require('../models');

// Créer un véhicule
exports.createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    console.error('Erreur lors de la création du véhicule :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création du véhicule.' });
  }
};

// Récupérer tous les véhicules
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.status(200).json(vehicles);
  } catch (error) {
    console.error('Erreur lors de la récupération des véhicules :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des véhicules.' });
  }
};

// Récupérer un véhicule par ID
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ error: 'Véhicule non trouvé.' });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    console.error('Erreur lors de la récupération du véhicule :', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

// Mettre à jour un véhicule
exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ error: 'Véhicule non trouvé.' });
    }
    await vehicle.update(req.body);
    res.status(200).json(vehicle);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du véhicule :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du véhicule.' });
  }
};

// Supprimer un véhicule
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ error: 'Véhicule non trouvé.' });
    }
    await vehicle.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Erreur lors de la suppression du véhicule :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression du véhicule.' });
  }
};

