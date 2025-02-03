const orderItemModel = require('../models/order_item');
const productModel = require('../models/product');
const orderModel = require('../models/order')

exports.createOrderItem = async (req, res) => {
  try {
    const { id, pd } = req.params;
    const checkUser = await orderModel.findOne({ where: { userId: id } });

    if (!checkUser) {
      return res.status(400).json('Invalid userId');
    }


    const randomNum = Math.floor(Math.random() * 10000);
    const ID = 'OI' + randomNum

    const { orderId, productId, quantity } = req.body;

    const data = {
      id: ID,
      orderId,
      productId,
      quantity
    }

    const newOrderItems = await orderItemModel.create(data);
    res.status(201).json('Order has been made successfully');
    
    const checkProduct = await productModel.findOne({ where: { id: pd } });
    let newStock = checkProduct.dataValues.stock;
    
    if (newOrderItems) {

    }

  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    })
  }
}