const mongoose = require('mongoose');

const { descriptionValidator, logsArrayValidator, dateValidator } = require('../validators/index');

const logsSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    logs: {
        type: [{
            exerciseId: {
                type: Number
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
                type: String,
                require: false,
                validate: dateValidator
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
