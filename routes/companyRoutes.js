const express = require('express');
const router = express.Router();

const { Enterprise } = require('../models');

// GET all enterprises
router.get('/', async (req, res) => {
  try {
    const enterprises = await Enterprise.findAll();
    res.json(enterprises);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch enterprises.' });
  }
});

module.exports = router;

