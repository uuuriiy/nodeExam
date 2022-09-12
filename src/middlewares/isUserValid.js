const { UserModel } = require('../database/User');


module.exports = async(req, res, next) => {
    try {
        const user = req.body;
        const userMock = new UserModel(user);

        userMock.validate(err => {
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