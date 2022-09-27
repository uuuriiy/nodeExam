const mongoose = require('mongoose');

const { descriptionValidator } = require('../validators/index');


const exerciseSchema = new mongoose.Schema({
  userId: {
    type: Number
  },
  exerciseId: {
    type: Number
},
  description: {
    type: String,
    minlength: 4,
    validate: descriptionValidator
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    require: false
  },
});

const ExerciseModel = mongoose.model('Exercises', exerciseSchema);

module.exports = {
  exerciseSchema,
  ExerciseModel
};
