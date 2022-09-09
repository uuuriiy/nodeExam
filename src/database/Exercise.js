const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  userId: Number,
  exerciseId: Number,
  description: {
    type: String,
    minlength: 4,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    require: false
  },
}, { _id: false});

const ExerciseModel = mongoose.model('Exercises', exerciseSchema);

module.exports = {
  exerciseSchema,
  ExerciseModel
};
