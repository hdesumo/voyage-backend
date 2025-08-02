// routes/vehicleRoutes.js

const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// Créer un véhicule
router.post('/', vehicleController.createVehicle);

// Récupérer tous les véhicules
router.get('/', vehicleController.getAllVehicles);

// Récupérer un véhicule par ID
router.get('/:id', vehicleController.getVehicleById);

// Mettre à jour un véhicule
router.put('/:id', vehicleController.updateVehicle);

// Supprimer un véhicule
router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router;

