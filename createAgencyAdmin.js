const readline = require('readline');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const AgencyAdmin = require('./models/AgencyAdmin');
const sequelize = require('./config/database');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function prompt(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function createAgencyAdmin() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données établie avec succès.');

    const fullname = await prompt('Nom complet : ');
    const email = await prompt('Email : ');
    const password = await prompt('Mot de passe : ');
    const phone = await prompt('Téléphone : ');
    const agencyId = await prompt('ID de l’agence : ');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await AgencyAdmin.create({
      id: uuidv4(),
      fullname,
      email,
      password: hashedPassword,
      phone,
      agencyId,
    });

    console.log('✅ Admin d’agence créé avec succès :');
    console.log(newAdmin.toJSON());
    rl.close();
  } catch (error) {
    console.error('❌ Erreur :', error.message);
    rl.close();
  }
}

createAgencyAdmin();