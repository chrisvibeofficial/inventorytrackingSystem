const express = require('express');
const port = 7890;
const app = express();
const cors = require('cors');
const sequelize = require('./database/sequelize');
const userRouter = require('./router/userRouter');
const productRouter = require('./router/productRouter');
const orderRouter = require('./router/orderRouter');
const orderItemRouter = require('./router/orderItemRouter');


app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(productRouter);
app.use(orderRouter);
app.use(orderItemRouter);


const server = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

server()

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})