require('dotenv').config(); // charge .env
const bcrypt = require('bcryptjs');
const db = require('./config/database');
const SuperAdmin = require('./models/SuperAdmin');

async function createSuperAdmin() {
  try {
    await db.authenticate();
    console.log('✅ Connected to the database.');

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await SuperAdmin.create({
      fullname: 'Admin Principal',
      email: 'superadmin@voyagemax.net',
      password: hashedPassword,
      status: 'active',
    });

    console.log('✅ SuperAdmin created successfully:', admin.toJSON());
  } catch (err) {
    console.error('❌ Error creating SuperAdmin:', err);
  } finally {
    await db.close();
  }
}

createSuperAdmin();

