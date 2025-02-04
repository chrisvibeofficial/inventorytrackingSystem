const { createOrder } = require('../controller/orderController');
const orderRouter = require('express').Router();

orderRouter.post('/order/:id', createOrder);

module.exports = orderRouter