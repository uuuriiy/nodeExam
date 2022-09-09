const userRouter = require('express').Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { userMiddleware, exerciseMiddleware } = require('../../middlewares/index')
const usersController = require('../../controllers/users.controller');


userRouter.post('/', jsonParser, userMiddleware, usersController.addUser);

userRouter.get('/', usersController.getUsers);

userRouter.post('/:_id/exercises', jsonParser, exerciseMiddleware, usersController.addExercise);

userRouter.get('/:_id/logs', usersController.getLogs);


module.exports = userRouter;
