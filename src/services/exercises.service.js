const { ExerciseModel } = require('../database/Exercise');

const exercisesService = {
  createExercise: async (userId, exercise) => await ExerciseModel.insertMany([{userId, ...exercise}]),
  getExercises: async (id) => await ExerciseModel.find({id}),
};

module.exports = exercisesService;
