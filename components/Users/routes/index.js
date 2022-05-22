const { validateUser } = require('../../../middlewares');
const signUpValidator = require('../validators/SignUp');
const updateUserValidator = require('../validators/UpdateUser');

const UserController = require('../controllers/UserController');
const userController = UserController;

const { Router } = require('express');
const userRouter = Router();


userRouter
    .route('/api/users')
    .get(userController.getAllUsers)
    .post(signUpValidator, userController.createUser);

userRouter
    .route('/api/users/:id')
    .get(validateUser, userController.getUser)
    .put(updateUserValidator, validateUser, userController.updateUser);

module.exports = userRouter;