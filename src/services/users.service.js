const { UserModel } = require('../database/User');

const usersService = {
  getUsers: async () => await UserModel.find({}),
  getUserById: async (id) => await UserModel.find({id}),
  create: async (user) => await UserModel.insertMany([user]),
  delete: async() => await UserModel.deleteMany()
};

module.exports = usersService;
