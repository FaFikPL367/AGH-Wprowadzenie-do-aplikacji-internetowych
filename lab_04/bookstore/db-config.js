const Sequelize = require('sequelize');

// Konfiguracja bazy danych
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../bookstore.sqlite',
    logging: console.log
});

module.exports = sequelize;
