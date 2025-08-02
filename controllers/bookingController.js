const { Booking } = require('../models');

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Réservation non trouvée' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const [updated] = await Booking.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Réservation non trouvée' });
    const updatedBooking = await Booking.findByPk(req.params.id);
    res.json(updatedBooking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const deleted = await Booking.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Réservation non trouvée' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

