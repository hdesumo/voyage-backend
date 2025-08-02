const AgencyAdmin = require('../models/AgencyAdmin');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

exports.createAgencyAdmin = async (req, res) => {
  try {
    const { fullname, email, password, phone, agencyId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await AgencyAdmin.create({
      fullname, email, password: hashedPassword, phone, agencyId,
    });
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAgencyAdmins = async (req, res) => {
  try {
    const admins = await AgencyAdmin.findAll();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAgencyAdminById = async (req, res) => {
  try {
    const admin = await AgencyAdmin.findByPk(req.params.id);
    if (admin) res.json(admin);
    else res.status(404).json({ message: 'Agency Admin not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAgencyAdmin = async (req, res) => {
  try {
    const admin = await AgencyAdmin.findByPk(req.params.id);
    if (admin) {
      await admin.update(req.body);
      res.json(admin);
    } else {
      res.status(404).json({ message: 'Agency Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAgencyAdmin = async (req, res) => {
  try {
    const admin = await AgencyAdmin.findByPk(req.params.id);
    if (admin) {
      await admin.destroy();
      res.json({ message: 'Deleted successfully' });
    } else {
      res.status(404).json({ message: 'Agency Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};