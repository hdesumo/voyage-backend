// createEnterprise.js
const readline = require('readline');
const bcrypt = require('bcryptjs');
const { Enterprise } = require('./models');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function createEnterprise() {
  try {
    const name = await askQuestion('Nom de l’entreprise : ');
    const email = await askQuestion('Email de l’entreprise : ');
    const phone = await askQuestion('Téléphone : ');
    const password = await askQuestion('Mot de passe : ');
    const hashedPassword = await bcrypt.hash(password, 10);

    const enterprise = await Enterprise.create({
      name,
      email,
      phone,
      password: hashedPassword,
      status: 'active',
    });

    console.log('✅ Entreprise créée avec succès :');
    console.log(enterprise.toJSON());
  } catch (error) {
    console.error('❌ Erreur lors de la création de l’entreprise :', error.message);
  } finally {
    rl.close();
  }
}

createEnterprise();

