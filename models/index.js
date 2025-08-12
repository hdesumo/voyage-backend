'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// On réutilise l'instance déjà configurée (ex: config/database.js exporte un Sequelize)
const sequelize = require('../config/database');

const basename = path.basename(__filename);
const db = {};

function initFromExport(file, exported) {
  // 1) Export "fonction": (sequelize, DataTypes) => Model
  if (typeof exported === 'function') {
    return exported(sequelize, Sequelize.DataTypes);
  }

  // 2) Export "classe": class User extends Model { ... }
  //    -> si non initialisée, il faut appeler .init(...)
  if (exported && typeof exported.init === 'function') {
    const ModelClass = exported;

    // Si la classe n'est pas encore liée à sequelize, on tente une init légère.
    if (!ModelClass.sequelize) {
      // On essaye de deviner la config d'init si elle est exposée,
      // sinon on suppose que le fichier a déjà fait Model.init(...)
      const attrs =
        ModelClass.rawAttributes ||
        ModelClass.attributes ||
        ModelClass.fields;

      if (attrs) {
        ModelClass.init(attrs, {
          sequelize,
          modelName: ModelClass.name || path.parse(file).name
        });
      }
    }
    return ModelClass;
  }

  // 3) Cas ESM transpile: { default: class ... }
  if (exported && exported.default && typeof exported.default.init === 'function') {
    const ModelClass = exported.default;
    if (!ModelClass.sequelize) {
      const attrs =
        ModelClass.rawAttributes ||
        ModelClass.attributes ||
        ModelClass.fields;
      if (attrs) {
        ModelClass.init(attrs, {
          sequelize,
          modelName: ModelClass.name || path.parse(file).name
        });
      }
    }
    return ModelClass;
  }

  throw new Error(`Export de modèle non reconnu pour ${file}`);
}

// Charger tous les modèles du dossier
fs.readdirSync(__dirname)
  .filter((file) =>
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const modelPath = path.join(__dirname, file);
    const exported = require(modelPath);

    try {
      const model = initFromExport(file, exported);

      if (!model || !model.name) {
        console.warn(`⚠️  Modèle sans nom ou non initialisé correctement: ${file}`);
        return;
      }
      db[model.name] = model;
    } catch (err) {
      console.error(`❌ Erreur de chargement du modèle "${file}":`, err.message);
    }
  });

// Exécuter les associations si définies
Object.keys(db).forEach((name) => {
  const m = db[name];
  if (typeof m.associate === 'function') {
    m.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

