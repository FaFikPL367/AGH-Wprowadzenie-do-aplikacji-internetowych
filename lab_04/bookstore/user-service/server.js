const express = require('express');
const sequelize = require('../db-config');
const app = express();
const { userRegister, userLogin } = require('./controllers/userControllers');

const PORT = 5000;

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
app.post('/api/register', userRegister);
app.post('/api/login', userLogin);

// Nasłuchiwanie servera
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
});