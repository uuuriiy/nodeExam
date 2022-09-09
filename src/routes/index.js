const router = require('express').Router();
const usersRouter = require('./users/users.router');

router.use('/users', usersRouter);

module.exports = router;
