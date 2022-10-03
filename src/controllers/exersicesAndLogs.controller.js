const { ExerciseModel } = require('../database/Exercise');
const { LogsModel } = require('../database/Logs');
const exercisesService = require('../services/exercises.service');
const logsService = require('../services/logs.service');
const ErrorHandler = require('../errors/index');
const generateUniqueId = require('generate-unique-id');

const exercicesAndLogsController = {
    addExercise: async (req, res, next) => {
      try {
        const { _id } = req.params;
        const exercise = req.body;
        const { date } = exercise;
        const exerciseId = generateUniqueId({
          length: 20,
          useLetters: false
        });
        exercise.exerciseId = +exerciseId;
        
        if (!date) exercise.date = new Date();
        
        ExerciseModel.init();
        const exerciseMock = new ExerciseModel({userId: +_id, ...exercise});
        
        await exerciseMock.save((err) => {
          if(!err){
            console.log('you saved exercises');
            res.status(200).json({ success: true, data: exerciseMock});
          }
        });
        
        const logs = await logsService.getLogs(+_id);
        const exercises = await (await exercisesService.getExercises(+_id))

        if (!logs.length) {
          LogsModel.init();
          const logsMock = new LogsModel({id: +_id, logs: [...exercises], count: exercises.length});

          logsMock.save((err) => {
            if (!err) {
              console.log('you saved logs');
            }
          });
        } else {
          return await logsService.updateLogs(+_id, exercises);
        }

      } catch (e) {
        next(e);
      }
    },
    getLogs: async (req, res, next) => {
        try {
          const { _id } = req.params;
          const { from, to, limit } = req.query;
          let logs = await logsService.getLogs(+_id, +limit);

          if (from) {
            logs = await logsService.getLogsByQuery(+_id, from, to, +limit);
          }

          if(!logs) return next(new ErrorHandler(404));
    
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