// Pobrać model bazy danych
const BookSchema = require('../db');

// 1. Pobieranie wszystkich książek
const getAllBooks = async (req, res) => {
    try {
        const books = await BookSchema.findAll(); // pobranie wszystkich książek

        return res.status(200).json(books); // zwrócenie wszustkich plików w JSON
    } catch (error) {
        return res.status(500).json({message: 'Error fetching books', error: error.toString()});
    }
};


// 2. Pobieranie pojedynczej książki
const getOneBook = async (req, res) => {
    const { id } = req.params; // wzięcie id z parametru

    try {
        const book = await BookSchema.findByPk(id);
        
        // Sprawdzenie czy książka w bazie
        if (!book) { return res.status(404).json({ meesage: 'Cannot find Book !!'})};

        // W innym przypadku zwracamy dane o książce
        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json({message: 'Error fetching books: ', error: error.toString()});
    }
}


// 3. Dodawanie książki do bazy
const addNewBook = async (req, res) => {
    const { name, author, year } = req.body; // wzięcie danych z body (pliku json)

    // Sprawdzenie czy każda dana została podana
    if (!name) {res.status(400).json({ meesage: 'Name required !!'})};
    if (!author) {res.status(400).json({ meesage: 'Author required !!'})};
    if (!year) {res.status(400).json({ meesage: 'Year required !!'})};

    try {
        const findBook = await BookSchema.findOne({where: {name, author, year}});
        if (findBook) {return res.statu(400).json({message: 'Book already exist !!'})};

        const newBook = await BookSchema.create( {name, author, year} );
        return res.status(200).json( {id: newBook.id });
    } catch (error) {
        return res.status(500).json({message: 'Error fetching books', error: error.toString()});
    }
}


// 4. Usunięcie książki
const deleteBook = async (req, res) => {
    const { id } = req.params; // odczytanie id z parametru

    try {
        const book = await BookSchema.findByPk(id);
        
        // Sprawdzenie czy książka w bazie
        if (!book) { return res.status(404).json({ meesage: 'Cannot find Book !!'})};

        await book.destroy(); // usunięcie książki z bazy
        return res.status(200).json({ message: 'Book deleted' });
    } catch (error) {
        return res.status(500).json({message: 'Error fetching books', error: error.toString()});
    }
}

// Eksportowanie modułów
module.exports = { getAllBooks, getOneBook, addNewBook, deleteBook };