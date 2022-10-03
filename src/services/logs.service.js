const { LogsModel } = require('../database/Logs');
const { ExerciseModel } = require('../database/Exercise');
const { 
  _getLogs, getLogsWithLimit,
  getLogsQueryFrom, getLogsQueryFromWithLimit,
  getLogsQueryFromAndTo, getLogsQueryFromAndToWithLimit
} = require('../utils/index')


const logsService = {
  createLogs: async (id, exercises) => 
    await LogsModel.collection.insertOne({id, logs: [...exercises], count: exercises.length}),
  getLogs: (id, limit) => limit ?  getLogsWithLimit(id, limit) : _getLogs(id),
  getLogsByQuery: (id, from, to, limit) => {
    switch (!!from) {
      case !!from && !!to && !!limit:
        return getLogsQueryFromAndToWithLimit(id, from, to, limit)
      case !!from && !!to:
        return getLogsQueryFromAndTo(id, from, to);
      case !!from && !!limit:
        return getLogsQueryFromWithLimit(id, from, limit);
      case !!from: 
        return getLogsQueryFrom(id, from);
    }
  },
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
