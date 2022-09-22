const router = require('express').Router();
const usersRouter = require('./users/users.router');

router.use('/users', usersRouter);

router.use('*', (err, req, res, next) => res.status(err.status || 400).json({
    message: err.message,
    code: err.customCode
}));

module.exports = router;
