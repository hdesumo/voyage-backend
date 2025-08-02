const { Enterprise } = require('../models');

exports.getAllEnterprises = async (req, res) => {
  try {
    const enterprises = await Enterprise.findAll({ order: [['createdAt', 'DESC']] });
    res.json(enterprises);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des sociétés' });
  }
};

exports.createEnterprise = async (req, res) => {
  try {
    const { name, email, phone, logo } = req.body;

    const existing = await Company.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email déjà utilisé' });

    const enterprise = await Enterprise.create({ name, email, phone, logo });
    res.status(201).json(enterprise);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la création', details: err.message });
  }
};

exports.updateEnterprise = async (req, res) => {
  try {
    const { name, email, phone, logo } = req.body;
    const enterprise = await Enterprise.findByPk(req.params.id);
    if (!enterprise) return res.status(404).json({ error: 'Société non trouvée' });

    enterprise.name = name;
    enterprise.email = email;
    enterprise.phone = phone;
    enterprise.logo = logo;
    await enterprise.save();

    res.json(enterprise);
  } catch (err) {
    res.status(500).json({ error: 'Erreur de mise à jour', details: err.message });
  }
};

exports.activateEnterprise = async (req, res) => {
  try {
    const enterprise = await Enterprise.findByPk(req.params.id);
    if (!enterprise) return res.status(404).json({ error: 'Société non trouvée' });

    enterprise.status = 'active';
    await enterprise.save();
    res.json({ message: 'Société activée', enterprise });
  } catch (err) {
    res.status(500).json({ error: 'Erreur d’activation' });
  }
};

exports.deactivateEnterprise = async (req, res) => {
  try {
    const enterprise = await Enterprise.findByPk(req.params.id);
    if (!enterprise) return res.status(404).json({ error: 'Société non trouvée' });

    enterprise.status = 'inactive';
    await enterprise.save();
    res.json({ message: 'Société désactivée', enterprise });
  } catch (err) {
    res.status(500).json({ error: 'Erreur de désactivation' });
  }
};

