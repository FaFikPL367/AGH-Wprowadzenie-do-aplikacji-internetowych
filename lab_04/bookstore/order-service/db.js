const DataTypes = require('sequelize');
const sequelize = require('../db-config');
const UserSchema = require('../user-service/db');
const BookSchema = require('../book-service/db');

// Stworzenie schematu bazy danych
const OrderSchema = sequelize.define('OrderSchema', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    UserID: {
        type: DataTypes.INTEGER,
        references: {
            model: UserSchema,
            key: 'id'
        }
    },
    BookID: {
        type: DataTypes.INTEGER,
        references: {
            model: BookSchema,
            key: 'id'
        }
    },
    Quantity: DataTypes.INTEGER
}, {
    timestamps: false
});


// Eksportujemy moduł bazy
module.exports = OrderSchema;