const { createProduct, getProducts, getProduct, getLowStockProduct } = require('../controller/productController');
const productRouter = require('express').Router()

productRouter.post('/product', createProduct)
productRouter.get('/products', getProducts)
productRouter.get('/products/:id', getProduct)
productRouter.get('/products-lowstock', getLowStockProduct)

module.exports = productRouter