const { LogsModel } = require('../database/Logs');
const { ExerciseModel } = require('../database/Exercise');


const logsService = {
  createLogs: async (id, exercises) => 
    await LogsModel.collection.insertOne({id, logs: [...exercises], count: exercises.length}),
  getLogs: async (id) => await LogsModel.find({id}),
  updateLogs: async(id, exercises) => 
    await LogsModel.updateOne({id}, {
      $addToSet: {logs: [...exercises]},
      $set: {count: exercises.length},
    }, {
      _id: false,
      upsert: true
    }),
  deleteLogsAndExercises: async() => {
    await LogsModel.deleteMany();
    await ExerciseModel.deleteMany();
  }
};

module.exports = logsService;
