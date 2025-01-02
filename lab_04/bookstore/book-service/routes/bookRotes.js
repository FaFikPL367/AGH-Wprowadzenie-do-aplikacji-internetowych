// Zapisanie jakie route nasz serwer przyjmuje
const express = require('express');
const authenticateToken = require('../../authorization');

// Pobranie logiki każdeg routa
const { getAllBooks, getOneBook, addNewBook, deleteBook } = require('../controllers/bookController');

// Odpalenia ogólnego routa, który będzie określał co robić dla każdej logiki
const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getOneBook);
router.post('/', authenticateToken, addNewBook);
router.delete('/:id', authenticateToken, deleteBook);


// Eksportowanie modułu routa
module.exports = router;