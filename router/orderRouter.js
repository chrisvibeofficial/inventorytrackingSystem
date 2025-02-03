const { createOrder } = require('../controller/orderController');
const orderRouter = require('express').Router();

orderRouter.post('/orders/:id', createOrder);

module.exports = orderRouter