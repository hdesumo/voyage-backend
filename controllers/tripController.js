const { Trip } = require('../models');

exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (!trip) return res.status(404).json({ error: 'Trajet non trouvé' });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.createTrip = async (req, res) => {
  try {
    const newTrip = await Trip.create(req.body);
    res.status(201).json(newTrip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTrip = async (req, res) => {
  try {
    const [updated] = await Trip.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Trajet non trouvé' });
    const updatedTrip = await Trip.findByPk(req.params.id);
    res.json(updatedTrip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    const deleted = await Trip.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Trajet non trouvé' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

