const { UserModel } = require('../database/User');

const usersService = {
  getAll: async () => await UserModel.find({}),
  create: async (user) => await UserModel.insertMany([user]),
  delete: async() => await UserModel.deleteMany()
};

module.exports = usersService;
