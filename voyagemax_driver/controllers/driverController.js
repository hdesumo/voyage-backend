const Driver = require('../models/Driver');
const bcrypt = require('bcryptjs');

exports.createDriver = async (req, res) => {
  try {
    const { fullname, phone, pin, enterpriseId } = req.body;
    const hashedPin = await bcrypt.hash(pin, 10);
    const driver = await Driver.create({ fullname, phone, pin: hashedPin, enterpriseId });
    res.status(201).json(driver);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la création du chauffeur' });
  }
};

exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.findAll();
    res.status(200).json(drivers);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des chauffeurs' });
  }
};

exports.updateDriverStatus = async (req, res) => {
  try {
    const driver = await Driver.findByPk(req.params.id);
    if (!driver) return res.status(404).json({ error: 'Chauffeur non trouvé' });

    driver.status = req.body.status;
    await driver.save();
    res.status(200).json(driver);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du statut' });
  }
};
