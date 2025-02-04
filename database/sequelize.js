const { Sequelize, Model } = require('sequelize');

const sequelize = new Sequelize('inventorytrackingSystem', 'root', '@Chrisvibe070697000', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize