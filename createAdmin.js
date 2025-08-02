const readline = require('readline');
const bcrypt = require('bcryptjs');
const { sequelize, Admin, Enterprise } = require('./models');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question) =>
  new Promise((resolve) => rl.question(question, resolve));

async function createAdmin() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données établie avec succès.');

    const fullname = await askQuestion('Nom complet : ');
    const email = await askQuestion('Email : ');
    const phone = await askQuestion('Téléphone : ');
    const password = await askQuestion('Mot de passe : ');

    // Vérification des entreprises existantes
    const enterprises = await Enterprise.findAll();
    if (enterprises.length === 0) {
      console.log('❌ Aucune entreprise trouvée. Veuillez d\'abord en créer une.');
      rl.close();
      return;
    }

    console.log('\nEntreprises disponibles :');
    enterprises.forEach((ent, index) => {
      console.log(`${index + 1}. ${ent.name} (${ent.email})`);
    });

    const choice = await askQuestion('\nSélectionnez l\'entreprise (numéro) : ');
    const selectedEnterprise = enterprises[parseInt(choice) - 1];

    if (!selectedEnterprise) {
      console.log('❌ Sélection invalide.');
      rl.close();
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      fullname,
      email,
      phone,
      password: hashedPassword,
      companyId: selectedEnterprise.id,
    });

    console.log('✅ Admin créé avec succès :');
    console.log({
      id: newAdmin.id,
      fullname: newAdmin.fullname,
      email: newAdmin.email,
      phone: newAdmin.phone,
      companyId: newAdmin.companyId,
    });
  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'admin :', error);
  } finally {
    rl.close();
    await sequelize.close();
  }
}

createAdmin();

