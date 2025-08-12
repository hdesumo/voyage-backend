'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// ⚠️ On réutilise l'instance Sequelize déjà créée dans config/database
// (c’est ce que tu utilises dans app.js: db.authenticate(), db.sync(), etc.)
const sequelize = require('../config/database');

const basename = path.basename(__filename);
const db = {};

// Parcourt tous les fichiers de modèles du dossier
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&            // ignore fichiers cachés
      file !== basename &&                  // ignore index.js
      file.slice(-3) === '.js'              // ne prend que .js
    );
  })
  .forEach((file) => {
    const modelPath = path.join(__dirname, file);
    const imported = require(modelPath);

    let model = null;

    try {
      if (typeof imported === 'function') {
        // Cas "classique" sequelize-cli : export d'une fonction (sequelize, DataTypes) => Model
        model = imported(sequelize, Sequelize.DataTypes);
      } else if (imported && typeof imported.init === 'function') {
        // Cas "class-based" : export d'une classe qui étend Sequelize.Model
        // On s'attend à ce que le fichier N'A PAS encore appelé init()
        // -> On tente de l'initialiser proprement ici si besoin.
        const ModelClass = imported;

        // Tentative d'initialisation si pas encore faite (pas de connexion attachée)
        if (!ModelClass.sequelize) {
          // On essaye de récupérer des attributs définis sur la classe (plusieurs conventions possibles)
          const attrs =
            ModelClass.rawAttributes ||
            ModelClass.attributes ||
            ModelClass.fields;

          if (attrs) {
            // La classe expose déjà une description des champs
            ModelClass.init(attrs, {
              sequelize,
              modelName: ModelClass.name,
            });
          } else if (typeof ModelClass.defineAttributes === 'function') {
            // Convention maison: la classe expose defineAttributes(DataTypes)
            const defined = ModelClass.defineAttributes(Sequelize.DataTypes);
            ModelClass.init(defined, {
              sequelize,
              modelName: ModelClass.name,
            });
          } else {
            // Dernier recours: on suppose que le fichier a déjà fait Model.init(...)
            // Dans ce cas, on n'a rien à faire.
          }
        }

        model = ModelClass;
      } else if (imported && imported.default && typeof imported.default.init === 'function') {
        // Cas transpilation/ESModule vers CommonJS
        const ModelClass = imported.default;
        if (!ModelClass.sequelize) {
          const attrs =
            ModelClass.rawAttributes ||
            ModelClass.attributes ||
            ModelClass.fields;
          if (attrs) {
            ModelClass.init(attrs, {
              sequelize,
              modelName: ModelClass.name,
            });
          }
        }
        model = ModelClass;
      } else {
        console.warn(`⚠️  Modèle ignoré (export inconnu): ${file}`);
        return; // skip
      }

      if (!model || !model.name) {
        console.warn(`⚠️  Modèle sans nom ou non initialisé correctement: ${file}`);
        return;
      }

      db[model.name] = model;
    } catch (e) {
      console.error(`❌ Erreur lors du chargement du modèle ${file}:`, e);
    }
  });

// Gestion des associations si définies (associate(db))
Object.keys(db).forEach((modelName) => {
  const m = db[modelName];
  if (typeof m.associate === 'function') {
    m.associate(db);
  }
});

// Expose l'instance et Sequelize
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

