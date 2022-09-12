const router = require('express').Router();
const usersRouter = require('./users/users.router');
const { errorHandler } = require('../utils/index');


router.use('/users', usersRouter);

router.use('*', (err, req, res, next) => res.status(err.status || 400).json({
    message: errorHandler(err.message),
    code: err.customCode
}));

module.exports = router;
