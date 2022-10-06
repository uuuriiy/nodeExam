const userNameValidator = {
    validator: username => username.match(/^[A-Za-z]+$/),
    message: 'Name should contain only letters',
} 

const descriptionValidator = {
    validator: desc => desc.length > 3,
    message: 'Description should contain more than 3 letters',
}

const logsArrayValidator = {
    validator: arr => Array.isArray(arr) && arr.length > 0,
    message: 'Logs array should not be empty',
}

const dateValidator = {
    validator: date => !isNaN(Date.parse(date)),
    message: 'Date is not correct',
}

module.exports = {
    userNameValidator, descriptionValidator,
    logsArrayValidator, dateValidator
}