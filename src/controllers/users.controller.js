const usersService = require('../services/users.service');
const ErrorHandler = require('../errors/index');

module.exports = {
  getUsers: async (req, res, next) => {
    try {
      const users = await usersService.getAll();

      if (!users) return next(new Error(404));

      res.json(users);
    } catch (e) {
      next(e);
    }
  },
  addUser: async (req, res, next) => {
    try {
      const user = req.body;

      const isUserCreated = await usersService.create(user);

      if (!isUserCreated) return next(new ErrorHandler(400));

      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  },
  addExercise: async (req, res, next) => {
    try {
      const { _id } = req.params;
      const exercise = req.body;
      const { date } = exercise;

      if (!date) exercise.date = new Date();

      const isExerciseCreated = await usersService.createExercise(+_id, exercise);
      const exercises = await usersService.getExercise(+_id);
      const logs = await usersService.getLogs(+_id);

      if (!logs.length) await usersService.createLogs(+_id, exercises);
      
      await usersService.updateLogs(+_id, exercises, exercise)

      if (!isExerciseCreated) return next(new ErrorHandler(400));

      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  },
  getLogs: async (req, res, next) => {
    try {
      const { _id } = req.params;
      const logs = await usersService.getLogs(+_id);

      if (!logs) return next(new ErrorHandler(404));

      res.json(logs);
    } catch (e) {
      next(e);
    }
  }
};
