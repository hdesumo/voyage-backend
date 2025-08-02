require('dotenv').config();
const jwt = require('jsonwebtoken');

const testGenerateToken = () => {
  const payload = {
    id: '550e8400-e29b-41d4-a716-446655440000', // exemple d'UUID
    role: 'passenger',
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  console.log('✅ Token généré :\n');
  console.log(token);
};

testGenerateToken();

