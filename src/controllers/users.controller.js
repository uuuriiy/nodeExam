const usersService = require('../services/users.service');
const ErrorHandler = require('../errors/index');
const errorHandler = require('../utils/index');

const usersController = {
  getUsers: async (req, res, next) => {
    try {
      const users = await usersService.getAll();

      if (!users) return next(new Error(404));

      res.json(users);
    } catch (e) {
      next(e);
    }
  },
  addUser: async (req, res, next) => {
    try {
      const user = req.body;
      let id = 1;
      const users = await usersService.getAll();

      if(users.length) id = users.length + 1;

      const isUserCreated = await usersService.create({id, ...user});

      if (!isUserCreated) return next(new ErrorHandler(400));

      res.sendStatus(200);
    } catch (e) {
      res.status(400).json({ success: false, message: errorHandler(e.message)});
      
      next();
    }
  },
  deleteUsers: async() => {
    await usersService.delete()
  }
};


module.exports = usersController;
