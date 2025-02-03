const { createOrderItem } = require('../controller/orderItemController');
const orderItemRouter = require('express').Router()

orderItemRouter.post('/order-item/:productId', createOrderItem)

module.exports = orderItemRouter