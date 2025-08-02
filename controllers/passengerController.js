const { Passenger } = require('../models');

exports.getAllPassengers = async (req, res) => {
  try {
    const passengers = await Passenger.findAll();
    res.json(passengers);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.getPassengerById = async (req, res) => {
  try {
    const passenger = await Passenger.findByPk(req.params.id);
    if (!passenger) return res.status(404).json({ error: 'Passager non trouvé' });
    res.json(passenger);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.createPassenger = async (req, res) => {
  try {
    const newPassenger = await Passenger.create(req.body);
    res.status(201).json(newPassenger);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePassenger = async (req, res) => {
  try {
    const [updated] = await Passenger.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Passager non trouvé' });
    const updatedPassenger = await Passenger.findByPk(req.params.id);
    res.json(updatedPassenger);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePassenger = async (req, res) => {
  try {
    const deleted = await Passenger.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Passager non trouvé' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

