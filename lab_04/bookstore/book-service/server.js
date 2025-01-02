const express = require('express'); // załadowanie danego modułu
const app = express();
const bookRoutes = require('./routes/bookRotes');
const sequelize = require('../db-config');

const PORT = 3000;

// Stworzenie potrzebnych tabel w bazie danych
sequelize.sync({ force: false })
    .then(() => {
        console.log("Databes & Tables created successfully");
    })
    .catch ((error) => {
        console.error('Error during table creation:', error);
});

// Pozwala na wykonanie operacji za każdym razem gdy jest jakieś zapytanie
// Tutaj każde zapytanie jest zamieniane na plik JSON
app.use(express.json());


// Każde zapytanie przekierowane jest to do danego routa
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
    console.log(`Bookstore service running on port ${PORT}`);
})