const { LogsModel } = require('../database/Logs');
const { ExerciseModel } = require('../database/Exercise');


const logsService = {
  createLogs: async (id, exercises) => 
  {
    console.log({id, logs: [...exercises], count: exercises.length});
    // return 
    return await LogsModel.collection.insertOne({id, logs: [...exercises], count: exercises.length})
    // insertMany([{id, logs: [...exercises], count: exercises.length}])
  }
  ,
  getLogs: async (id) => await LogsModel.find({id}),
  updateLogs: async(id, exercises, exercise) => 
    await LogsModel.findOneAndUpdate(id, {
      $addToSet: {logs: exercise},
      $set: {count: exercises.length},
    }, {
      _id: false
    }),
  deleteLogsAndExercises: async() => {
    await LogsModel.deleteMany();
    await ExerciseModel.deleteMany();
  }
};

module.exports = logsService;
