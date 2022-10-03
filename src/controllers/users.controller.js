const usersService = require('../services/users.service');
const ErrorHandler = require('../errors/index');
const generateUniqueId = require('generate-unique-id');

const usersController = {
  getUsers: async (req, res, next) => {
    try {
      const { limit } = req.query;
      const users = await usersService.getUsers(limit);

      if (!users) return next(new ErrorHandler(404));

      res.json(users);
    } catch (e) {
      next(e);
    }
  },
  addUser: async (req, res, next) => {
    try {
      const user = req.body;
      const userId = generateUniqueId({
        length: 20,
        useLetters: false
      });
      const isUserCreated = await usersService.create({id: +userId, ...user});

      if (!isUserCreated) return next(new ErrorHandler(400));

      res.status(200).json({ success: true, data: {id: +userId, ...user}});
    } catch (e) {
      next(e);
    }
  },
  deleteUsers: async() => {
    await usersService.delete()
  }
};


module.exports = usersController;
