const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    }
}, { _id: false});

const UserModel = mongoose.model('Users', usersSchema)

module.exports = {
    UserModel,
    usersSchema
};
