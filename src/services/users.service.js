const { UserModel } = require('../database/User');
const { ExerciseModel } = require('../database/Exercise');
const { LogsModel } = require('../database/Logs');


module.exports = {
  getAll: async () => await UserModel.find({}),
  create: async (user) => await UserModel.insertMany([user]),
  createExercise: async (userId, exercise) => await ExerciseModel.insertMany([{userId, ...exercise}]),
  createLogs: async (id, exercises) => 
    await LogsModel.insertMany([{id, logs: [...exercises], count: exercises.length}]),
  getLogs: async (id) => await LogsModel.find({id}),
  updateLogs: async(id, exercises, exercise) => 
    await LogsModel.findOneAndUpdate(id, {
      $addToSet: {logs: exercise},
      $set: {count: exercises.length},
    }, {
      _id: false
    })
};
