const readline = require('readline');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('./config/database');
const Driver = require('./models/Driver');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

sequelize.sync().then(() => {
  rl.question('Nom complet : ', fullname => {
    rl.question('Téléphone : ', phone => {
      rl.question('Code PIN : ', async pin => {
        rl.question('ID de l'entreprise : ', async enterpriseId => {
          const hashedPin = await bcrypt.hash(pin, 10);
          try {
            const driver = await Driver.create({
              id: uuidv4(),
              fullname,
              phone,
              pin: hashedPin,
              enterpriseId,
            });
            console.log('✅ Chauffeur créé avec succès :');
            console.log(driver.toJSON());
          } catch (error) {
            console.error('❌ Erreur lors de la création :', error);
          } finally {
            rl.close();
            sequelize.close();
          }
        });
      });
    });
  });
});
