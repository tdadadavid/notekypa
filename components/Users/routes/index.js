const UserController = require('../controllers/UserController');
const { ensureUniqueEmail } = require('../../../middlewares/middleware');

const { Router } = require('express');
const userRouter = Router();

const userController = UserController;

userRouter
    .route('/api/users')
    .get(userController.getAllUsers)
    .post(ensureUniqueEmail, userController.createUser);

userRouter
    .route('/api/users/:id')
    .get(userController.getUser)
    .put(userController.updateUser);