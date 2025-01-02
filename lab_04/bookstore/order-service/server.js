// Uruchomienia samego serwera
const express = require('express');
const orderRoot = require('./routes/ordersRoot');
const sequelize = require('../db-config');
const app = express();

const PORT = 4000;

// Stworzenie samej bazy danych
sequelize.sync({force: false})
    .then( () => {
        console.log("Databes & Tables created successfully");
    })
    .catch ((error) => {
        console.error('Error during table creation:', error);
});

// Konwertowanie wszystko na JSON
app.use(express.json());

// Przekierowanie szystkich route na odpowiednie
app.use('/api/orders', orderRoot)

// Nasłuchiwanie servera
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
});