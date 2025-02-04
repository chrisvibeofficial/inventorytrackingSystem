const orderItemModel = require('../models/order_item');
const productModel = require('../models/product');
const orderModel = require('../models/order');

exports.createOrderItem = async (req, res) => {
  try {
    const { productId, orderId, quantity } = req.body
    const checkProduct = await productModel.findOne({ where: { id: productId } });

    if (!checkProduct) {
      return res.status(404).json('Product is unavailable')
    }

    const ranNum = Math.floor(Math.random() * 10000);
    const ID = 'OI' + ranNum;

    const data = {
      id: ID,
      orderId,
      productId,
      quantity
    }

    const newOrderItem = await orderItemModel.create(data)
    res.status(201).json({
      message: 'Items listed successfully',
      data: newOrderItem
    })

    if (newOrderItem) {
      await checkProduct.update({ stock: checkProduct.stock - quantity });
      await orderModel.update({ totalPrice: checkProduct.price * quantity }, { where: { id: orderId } });
    }

  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    })
  }
}