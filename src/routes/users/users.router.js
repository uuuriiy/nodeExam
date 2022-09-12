const userRouter = require('express').Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const userMiddleware = require('../../middlewares/isUserValid');
const exerciseMiddleware = require('../../middlewares/isExerciseValid');
const usersController = require('../../controllers/users.controller');
const exercicesAndLogsController = require('../../controllers/exersicesAndLogs.controller');

userRouter.post('/', jsonParser, userMiddleware, usersController.addUser);

userRouter.get('/', usersController.getUsers);

userRouter.post('/:_id/exercises', jsonParser, exerciseMiddleware, exercicesAndLogsController.addExercise);

userRouter.get('/:_id/logs', exercicesAndLogsController.getLogs);


module.exports = userRouter;
