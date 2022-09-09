const { ExerciseModel } = require('../database/Exercise');
const ErrorHandler = require('../errors');


module.exports = async(req, res, next) => {
    try {
        const exercise = req.body;
        const exerciseMock = new ExerciseModel(exercise);

        exerciseMock.validate(err => {
            if (err) return next(new ErrorHandler(`${err.name}: ${err.message}`, 400))
        })

        next();
    } catch (e) {
        next(e);
    }
}