const { ExerciseModel } = require('../database/Exercise');


const exerciseMiddleware = async(req, res, next) => {
    try {
        const exercise = req.body;
        const exerciseMock = new ExerciseModel(exercise);

        exerciseMock.validate(err => {
            if (err) {
                const handledError = err.message.split(":");

                return next(res.status(400).json({ 
                    success: false, 
                    message: handledError.slice(1, handledError.length).join(":")
                }))
            }
        })

        next();
    } catch (e) {
        res.status(400).json({ success: false, message: e.message });

        next();
    }
}

module.exports = exerciseMiddleware;
