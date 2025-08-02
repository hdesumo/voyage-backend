const bcrypt = require('bcrypt');
const { SuperAdmin } = require('../models');
const { v4: uuidv4 } = require('uuid');

async function createSuperAdmin() {
  const email = 'admin@voyagemax.net';
  const fullname = 'Honoré de Sumo';
  const plainPassword = 'Jethro25Mbobi35@@!?';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  try {
    const existing = await SuperAdmin.findOne({ where: { email } });
    if (existing) {
      console.log('❌ SuperAdmin already exists.');
      return;
    }

    await SuperAdmin.create({
      id: uuidv4(),
      email,
      fullname,
      password: hashedPassword,
    });

    console.log('✅ SuperAdmin created with email:', email);
  } catch (error) {
    console.error('🚨 Error creating SuperAdmin:', error);
  }
}

createSuperAdmin();

