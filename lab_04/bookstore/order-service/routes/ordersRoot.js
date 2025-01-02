const express = require('express');
const router = express.Router();
const authorizationToken = require('../../authorization');

const { getUserOrders, addNewOrder, deleteOrder, editOrder } = require('../controllers/orderControllers');

router.get('/:UserID',getUserOrders);
router.post('/', authorizationToken, addNewOrder);
router.delete('/:OrderID', authorizationToken, deleteOrder);
router.patch('/:OrderID', authorizationToken, editOrder);

module.exports = router;