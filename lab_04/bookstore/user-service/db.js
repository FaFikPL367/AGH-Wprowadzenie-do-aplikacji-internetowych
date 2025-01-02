const sequelize = require('../db-config');
const DataTypes = require('sequelize');

// Stworzenie schematu bazy danych
const UserSchema = sequelize.define('UserSchema', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password : {
        type: DataTypes.STRING
    },
}, {
    timestamps: false
});


module.exports = UserSchema;