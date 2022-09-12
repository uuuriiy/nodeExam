const mongoose = require('mongoose');

const { userNameValidator } = require('../validators/index');

const usersSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required !"],
        validate: userNameValidator
    }
}, { _id: false});

const UserModel = mongoose.model('Users', usersSchema);

module.exports = {
    UserModel,
    usersSchema
};
