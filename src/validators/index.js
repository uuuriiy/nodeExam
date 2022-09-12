const userNameValidator = {
    validator: (el) => el.match(/^[A-Za-z]+$/),
    message: 'Name should contain only letters',
} 

const descriptionValidator = {
    validator: (el) => el.length > 3,
    message: 'Description should contain more than 3 letters',
}

const logsArrayValidator = {
    validator: arr => Array.isArray(arr) && arr.length > 0,
    message: 'Logs array should not be empty',
}

module.exports = {
    userNameValidator, descriptionValidator,
    logsArrayValidator
}