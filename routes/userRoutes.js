const express = require('express');
const userRouter = express.Router();
const handler = require('../controllers/userController');
userRouter
.route('/')
.get(handler.getAllUsers)
.post(handler.createUser)
userRouter
.route('/:id')
.get(handler.getUserById)
.patch(handler.updateUser)
.delete(handler.deleteUser);

module.exports = userRouter;