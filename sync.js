// sync.js
const db = require('./models');

async function syncDatabase() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Connexion à la base de données établie avec succès.');

    await db.sequelize.sync({ alter: true }); // Utilise `alter: true` pour ajuster les tables sans les supprimer
    console.log('✅ Toutes les tables ont été synchronisées avec succès.');
    
    process.exit(0); // Fin du script proprement
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation de la base de données :', error);
    process.exit(1);
  }
}

syncDatabase();

