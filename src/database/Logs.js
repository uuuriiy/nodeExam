const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema({
    id: Number,
    logs: {
        type: [{
            id: {
                type: Number,
                unique: true
            },
            description: {
                type: String,
                min: [4, 'Must be at least 4, got {VALUE}'],
              },
              duration: {
                type: Number,
                required: true,
              },
              date: {
                type: Date,
                require: false
              }
        }],
        validate: arr => Array.isArray(arr) && arr.length > 0,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
}, { _id: false});

const LogsModel = mongoose.model('Logs', logsSchema);

module.exports = {
    logsSchema,
    LogsModel
};
