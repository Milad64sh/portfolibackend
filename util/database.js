const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node-portfolio', 'root', 'Mg100761#', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
