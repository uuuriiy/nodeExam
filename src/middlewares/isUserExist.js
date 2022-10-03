const usersService = require('../services/users.service');

const usersMiddleware = async(req, res, next) => {
    try {
        const { _id } = req.params;

        const user = await usersService.getUserById(+_id);

        if(!user.length) return res.status(404).json({message: "userId is not correct"});

        next();
    } catch (e) {
        next(e);
    }
}

module.exports = usersMiddleware;
