const mongoose = require('mongoose');

const { descriptionValidator, logsArrayValidator } = require('../validators/index');

const logsSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    logs: {
        type: [{
            exerciseId: {
                type: Number,
                unique: true
            },
            description: {
                type: String,
                min: [4, 'Must be at least 4, got {VALUE}'],
                validate: descriptionValidator
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
        validate: logsArrayValidator,
        required: true
    },
    count: {
        type: Number,
        required: true,
    }
});

const LogsModel = mongoose.model('Logs', logsSchema);

module.exports = {
    logsSchema,
    LogsModel
};
