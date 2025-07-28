// routes/auth.js
const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, pin } = req.body;

  if (email === 'admin@example.com' && pin === '1234') {
    return res.json({
      token: 'fake-jwt-token',
      role: 'admin',
    });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;

