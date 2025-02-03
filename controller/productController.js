const productModel = require('../models/product');
const { Op } = require('sequelize');


exports.createProduct = async (req, res) => {
  try {
    const { name, stock, price } = req.body;
    const existingProduct = await productModel.findOne({ where: { name: name } });

    if (existingProduct) {
      return res.status(400).json(`${name} already available. Please update the stock or price instead.`);
    }

    const ran = Math.floor(Math.random() * 10000);
    const productId = 'PD' + ran

    const data = {
      id: productId,
      name,
      stock,
      price
    }

    const newProduct = await productModel.create(data);
    res.status(201).json({
      message: 'Product created successfully',
      data: newProduct
    })
  } catch (error) {
    res.status(500).json({
      message: 'Inter server error',
      error: error.message
    })
  }
}


exports.getProducts = async (req, res) => {
  try {
    const allProducts = await productModel.findAll();
    res.status(200).json({
      message: 'All products below',
      total: allProducts.length,
      data: allProducts
    })
  } catch (error) {
    res.status(500).json({
      message: 'Inter server error',
      error: error.message
    })
  }
}


exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const checkProduct = await productModel.findOne({ where: { id: id } });

    if (!checkProduct) {
      return res.status(404).json('Product is not available')
    }

    const product = await productModel.findOne({ where: { id: checkProduct.dataValues.id } });
    res.status(200).json({
      message: 'All products below',
      product
    })
  } catch (error) {
    res.status(500).json({
      message: 'Inter server error',
      error: error.message
    })
  }
}


exports.getLowStockProduct = async (req, res) => {
  try {
    const lowStockProduct = await productModel.findAll({
      where: {
        stock: {
          [Op.lt]: 10
        }
      }
    });

    res.status(200).json({
      message: 'Low stocks products below',
      total: lowStockProduct.length,
      data: lowStockProduct
    })
  } catch (error) {
    res.status(500).json({
      message: 'Inter server error',
      error: error.message
    })
  }
}