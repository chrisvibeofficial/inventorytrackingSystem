const orderModel = require('../models/order');
const userModel = require('../models/user')

exports.createOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const checkUser = await userModel.findOne({ where: { id: id } });

    if (!checkUser) {
      return res.status(404).json('User not found')
    }

    const randomNum = Math.floor(Math.random() * 10000);
    const ID = 'OR' + randomNum

    const { totalPrice } = req.body;

    const data = {
      id: ID,
      userId: checkUser.dataValues.id,
      totalPrice
    };

    console.log(data);

    const newOrder = await orderModel.create(data);
    res.status(201).json({
      message: 'Order created successfully',
      tottalOrders: newOrder.length,
      data: newOrder
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    })
  }
}