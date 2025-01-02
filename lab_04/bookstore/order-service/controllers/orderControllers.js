const OrderSchema = require('../db');
const BookSchema = require('../../book-service/db');
const UserSchema = require('../../user-service/db');


// 1. Pobranie wszystkich zamówień użytkownika
const getUserOrders = async(req, res) => {
    const { UserID } = req.params; // pobranie ID z parametru

    try {
        // Sprawdzenie czy użytkownik istnieje
        const user = await UserSchema.findByPk(UserID);
        if (user === null) {return res.status(404).json({ message: 'Cannot find User !!'})};

        // Pobranie wszystkich zamówień
        const orders = await OrderSchema.findAll({where: {UserID}});
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching orders: ', error: error.toString() });
    }
}

// 2. Dodawanie zamówienia
const addNewOrder = async (req, res) => {
    const {UserID, BookID, Quantity} = req.body;

    if (!UserID) {return res.status(400).json({ meesage: 'UserID required !!'})};
    if (!BookID) {return res.status(400).json({ meesage: 'BookID required !!'})};
    if (!Quantity) {return res.status(400).json({ meesage: 'Quantity required !!'})};
    if (Quantity <= 0) {return res.status(400).json({ message: 'Incorrect quantity !!'})};

    try {
        const book = await BookSchema.findByPk(BookID);
        if (book === null) {return res.status(400).json({ meesage: 'Book not found !!'})};

        const user = await UserSchema.findByPk(UserID);
        if (user === null) {return res.status(400).json({ meesage: 'User not found !!'})}

        const newOrder = await OrderSchema.create({ UserID, BookID, Quantity });
        return res.status(200).json( {id: newOrder.id });
    } catch (error) {
        return res.status(500).json({message: 'Error fetching orders', error: error.toString()});
    }
}

// 3. Usuwanie zamówienia
const deleteOrder = async (req, res) => {
    const { OrderID } = req.params;

    try {
        const order = await OrderSchema.findByPk(OrderID);

        if (order === null) {return res.status(404).json({ meesage: 'Cannot find order !!'})};

        await order.destroy();
        return res.status(200).json({ message: 'Order deleted' });
    } catch (error) {
        return res.status(500).json({message: 'Error fetching orders', error: error.toString()});
    }
}

// 4. Edycja zamówienia
const editOrder = async (req, res) => {
    const { OrderID } = req.params;
    const { BookID, Quantity } = req.body;

    try {
        const order = await OrderSchema.findByPk(OrderID);
        if (order === null) {return res.status(404).json({ meesage: 'Book not found !!'})};

        if (BookID !== null) {order.BookID = BookID};
        if (Quantity !== null) {order.Quantity = Quantity};

        order.save();
        return res.status(200).json({ message: 'Order edited' });
    } catch (error) {
        return res.status(500).json({message: 'Error fetching books', error: error.toString()});
    }
}

module.exports = { getUserOrders, addNewOrder, deleteOrder, editOrder };