const orderItemModel = require('../models/order_item');
const productModel = require('../models/product');
const orderModel = require('../models/order');
const { where } = require('sequelize');

exports.createOrderItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { orderId, quantity } = req.body
    const checkProduct = await productModel.findOne({ where: { id: productId } });
    console.log(checkProduct);

    if (!checkProduct) {
      return res.status(404).json('Product is unavailable')
    }

    const ranNum = Math.floor(Math.random() * 10000);
    const ID = 'OI' + ranNum;

    const data = {
      id: ID,
      orderId,
      productId: checkProduct.dataValues.id,
      quantity
    }

    const newOrderItem = await orderItemModel.create(data)
    res.status(201).json({
      message: 'Items listed successfully',
      data: newOrderItem
    })

    if (newOrderItem) {
      const checkStock = checkProduct.dataValues.stock
      const newStock = checkProduct.dataValues.stock - checkStock
      await productModel.update(newStock, { where: { stock: checkStock } })
    }

  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    })
  }
}