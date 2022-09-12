const errorMessage = 'duplicate key error';

const errorHandler = (err) => {
    let handledError = err;

    if (handledError.includes(errorMessage)) {
        handledError = `${errorMessage.charAt(0).toUpperCase()}${errorMessage.slice(1)}`
    }

    return handledError;
}

module.exports = errorHandler;