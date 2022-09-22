const mongoose = require('mongoose');

const { descriptionValidator } = require('../validators/index');


const exerciseSchema = new mongoose.Schema({
  userId: Number,
  exerciseId: {
    type: Number,
    unique: true
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
