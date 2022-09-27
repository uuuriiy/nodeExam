const userRouter = require('express').Router();

const userMiddleware = require('../../middlewares/isUserExist');
const urlMiddleware = require('../../middlewares/isUrlValid');
const exerciseMiddleware = require('../../middlewares/isExerciseValid');
const usersController = require('../../controllers/users.controller');
const exercicesAndLogsController = require('../../controllers/exersicesAndLogs.controller');

userRouter.post('/', usersController.addUser);

userRouter.get('/', usersController.getUsers);

userRouter.delete('/', usersController.deleteUsers);

userRouter.post('/:_id/exercises', userMiddleware, exerciseMiddleware, exercicesAndLogsController.addExercise)
    .use(urlMiddleware);

userRouter.get('/:_id/logs', exercicesAndLogsController.getLogs);

userRouter.delete('/:_id/logs', exercicesAndLogsController.deleteLogs);

module.exports = userRouter;
