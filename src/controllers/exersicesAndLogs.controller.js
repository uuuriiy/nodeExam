const exercisesService = require('../services/exercises.service');
const logsService = require('../services/logs.service');
const ErrorHandler = require('../errors/index');
const { errorHandler } = require('../utils/index');

const exercicesAndLogsController = {
    addExercise: async (req, res, next) => {
        try {
          const { _id } = req.params;
          const exercise = req.body;
          const { date } = exercise;
    
          if (!date) exercise.date = new Date();
    
          const isExerciseCreated = await exercisesService.createExercise(+_id, exercise);
          const exercises = await exercisesService.getExercises(+_id);
          const logs = await logsService.getLogs(+_id);
    
          if (!logs.length) await logsService.createLogs(+_id, exercises);
          
          await logsService.updateLogs(+_id, exercises, exercise)
    
          if (!isExerciseCreated) return next(new ErrorHandler(400));
    
          res.sendStatus(200);
        } catch (e) {
          res.status(400).json({ success: false, message: errorHandler(e.message)});
    
          next();
        }
    },
    getLogs: async (req, res, next) => {
        try {
          const { _id } = req.params;
          const logs = await logsService.getLogs(+_id);
    
          if (!logs) return next(new ErrorHandler(404));
    
          res.json(logs);
        } catch (e) {
          next(e);
        }
      }
}

module.exports = exercicesAndLogsController;