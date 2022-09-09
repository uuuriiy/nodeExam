const { UserModel } = require('../database/User');
const ErrorHandler = require('../errors');


module.exports = async(req, res, next) => {
    try {
        const user = req.body;
        const userMock = new UserModel(user);

        userMock.validate(err => {
            if (err) return next(new ErrorHandler(err.message, 400))
        })

        next();
    } catch (e) {
        next(e);
    }
}