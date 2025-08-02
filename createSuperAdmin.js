// createSuperAdmin.js

require('dotenv').config();
const bcrypt = require('bcrypt');
const { sequelize, SuperAdmin } = require('./models');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) =>
  new Promise((resolve) => readline.question(question, resolve));

const run = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base réussie.\n');

    const fullname = await ask('Nom complet : ');
    const email = await ask('Email : ');
    const password = await ask('Mot de passe : ');

    const existing = await SuperAdmin.findOne({ where: { email } });
    if (existing) {
      console.log('❌ Un SuperAdmin avec cet email existe déjà.');
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const superadmin = await SuperAdmin.create({
      fullname,
      email,
      password: hashedPassword,
    });

    console.log('\n✅ SuperAdmin créé avec succès :');
    console.log({
      id: superadmin.id,
      fullname: superadmin.fullname,
      email: superadmin.email,
    });
  } catch (err) {
    console.error('❌ Erreur :', err.message);
  } finally {
    readline.close();
    await sequelize.close();
  }
};

run();

