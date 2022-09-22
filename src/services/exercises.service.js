const { ExerciseModel } = require('../database/Exercise');

const exercisesService = {
  createExercise: async (userId, exercise) => await ExerciseModel.insertMany([{userId, ...exercise}]),
  getExercises: async (userId) => await ExerciseModel.find(userId ? {userId} : {}),
};

module.exports = exercisesService;
