'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// Réutilise l'instance existante (ex: config/database.js exporte un Sequelize)
const sequelize = require('../config/database');

const basename = path.basename(__filename);
const db = {};

function isClass(fn) {
  try {
    const src = Function.prototype.toString.call(fn);
    return typeof fn === 'function' && /^\s*class\s/.test(src);
  } catch {
    return false;
  }
}

function initFromExport(file, exported) {
  // 1) Export "fonction" initialiseur: (sequelize, DataTypes) => Model
  if (typeof exported === 'function' && !isClass(exported)) {
    return exported(sequelize, Sequelize.DataTypes);
  }

  // 2) Export "classe": class Xxx extends Model { ... }
  if (isClass(exported) || (exported && typeof exported.init === 'function')) {
    const ModelClass = isClass(exported) ? exported : exported;
    // Si pas encore liée :
    if (!ModelClass.sequelize && typeof ModelClass.init === 'function') {
      // Si le fichier n'a pas déjà fait init(), on ne peut pas "deviner" les champs.
      // => Convention : chaque modèle class-based fait son Model.init(...) DANS son fichier.
      // Ici on ne fait rien de plus, on suppose que c'est déjà fait.
    }
    return ModelClass;
  }

  // 3) Cas ESM transpile: { default: class … }
  if (exported && exported.default && (isClass(exported.default) || typeof exported.default.init === 'function')) {
    const ModelClass = exported.default;
    if (!ModelClass.sequelize && typeof ModelClass.init === 'function') {
      // idem: init() doit être appelé dans le fichier du modèle.
    }
    return ModelClass;
  }

  throw new Error(`Export de modèle non reconnu pour ${file}`);
}

// Charge tous les fichiers modèle
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
        console.warn(`⚠️ Modèle sans nom ou non initialisé: ${file}`);
        return;
      }
      db[model.name] = model;
    } catch (err) {
      console.error(`❌ Erreur de chargement du modèle "${file}": ${err.message}`);
    }
  });

// Appelle associate(db) si présent
Object.keys(db).forEach((name) => {
  const m = db[name];
  if (typeof m.associate === 'function') m.associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

