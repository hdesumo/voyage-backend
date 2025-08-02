const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');

router.post('/', driverController.createDriver);
router.get('/', driverController.getAllDrivers);
router.put('/:id/status', driverController.updateDriverStatus);

module.exports = router;
