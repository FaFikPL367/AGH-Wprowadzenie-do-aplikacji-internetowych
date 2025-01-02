// Połączenie z SQLite oraz określenie schematu bazy
const DataTypes = require('sequelize');
const sequelize = require('../db-config');

// Tworzenie schematu nazy danych
const BookSchema = sequelize.define('BookSchema', {
    id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    author: {
        type: DataTypes.STRING
    },
    year: {
        type: DataTypes.INTEGER
    }
},{
    timestamps: false // wyłączenie dodawanie czasu otworzenia i aktualizacji
});


// Eksportowanie modułów
module.exports = BookSchema;