const { LogsModel } = require('../database/Logs');


const logsService = {
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

module.exports = logsService;
