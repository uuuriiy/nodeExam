const { ExerciseModel } = require('../database/Exercise');
const { LogsModel } = require('../database/Logs');
const exercisesService = require('../services/exercises.service');
const logsService = require('../services/logs.service');
const ErrorHandler = require('../errors/index');
const errorHandler = require('../utils/index');

const exercicesAndLogsController = {
    addExercise: async (req, res, next) => {
      try {
        const { _id } = req.params;
        const exercise = req.body;
        const { date } = exercise;
        const exercisesAll = await exercisesService.getExercises();
        exercise.exerciseId = 1;
        
        if (!date) exercise.date = new Date();

        if(exercisesAll.length) exercise.exerciseId = exercisesAll.length + 1;
        
        ExerciseModel.init();
        const exerciseMock = new ExerciseModel({userId: +_id, ...exercise});
        
        await exerciseMock.save((err) => {
          if(err){
            res.json({ success: false, message: errorHandler(err.message)});
          } else {
            console.log('you saved exercises');
            res.sendStatus(200);
          }
        });
        
        const logs = await logsService.getLogs(+_id);
        const exercises = await exercisesService.getExercises(+_id);

        if (!logs.length) {
          LogsModel.init();
          const logsMock = new LogsModel({id: +_id, logs: [...exercises], count: exercises.length});

          await logsMock.save((err) => {
          if(err){
            res.json({ success: false, message: errorHandler(err.message)});
            // console.log(err);
          } else {
            console.log('you saved logs');
          }
        });
        }

        await logsService.updateLogs(+_id, exercises, exercise);

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
      },
      deleteLogs: async() => {
        await logsService.deleteLogsAndExercises();
      }
}

module.exports = exercicesAndLogsController;