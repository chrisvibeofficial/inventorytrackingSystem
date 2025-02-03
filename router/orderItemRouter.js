const { createOrderItem } = require('../controller/orderItemController');
const orderItemRouter = require('express').Router()

orderItemRouter.post('/order-item/:id/:pd', createOrderItem)

module.exports = orderItemRouter