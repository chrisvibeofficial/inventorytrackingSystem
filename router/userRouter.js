const { createUser, getUsers, getUser, updateUserName, updatePhoneNumber, updatelocation, deleteUser } = require('../controller/userController');
const userRouter = require('express').Router();

userRouter.post('/user', createUser);
userRouter.get('/users', getUsers);
userRouter.get('/user/:id', getUser);
userRouter.put('/user-name/:id', updateUserName);
userRouter.put('/user-number/:id', updatePhoneNumber);
userRouter.put('/user-location/:id', updatelocation);
userRouter.delete('/user/:id', deleteUser);

module.exports = userRouter